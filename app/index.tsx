import { useMemo, useState } from "react";

import { Button, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  State,
} from "react-native-ble-plx";

import { Stack } from "expo-router";

export default function App() {
  const ble = useMemo(() => new BleManager(), []);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [allDevices, setAllDevices] = useState<Device[]>([]);

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const connectToDevice = async (device: Device) => {
    console.log(`Trying to connect to: ${device.id} ${device.name}`);
    try {
      const deviceConnection = await ble.connectToDevice(device.id, {
        timeout: 3000,
      });
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      console.log("Connected");
      stopScan();
    } catch (e) {
      console.error("Failed to connect", e);
    }
  };

  const scanForPeripherals = () => {
    console.log("Started scanning");
    ble.startDeviceScan(null, null, (error, device) => {
      setIsScanning(true);
      if (error) {
        console.error(error);
      }
      if (device) {
        console.log(
          `Found device: ${device.id}, ${device.localName}, ${device.name}`
        );
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const stopScan = () => {
    ble.stopDeviceScan();
    setIsScanning(false);
    console.log("Stopped scanning");
  };

  return (
    <View className="h-full w-full">
      <Stack.Screen options={{ title: "Home Page" }} />

      <Text className="text-center text-xl font-bold py-2">
        {connectedDevice?.name} {connectedDevice?.manufacturerData}
      </Text>

      <View className="flex flex-row items-center justify-evenly py-2">
        {!isScanning ? (
          <Button title="Start Scan" onPress={() => scanForPeripherals()} />
        ) : (
          <Button title="Stop Scan" onPress={stopScan} />
        )}
      </View>
      <View className="mx-2">
        <View className="w-full h-full">
          <FlashList
            data={allDevices}
            renderItem={(x) => (
              <View className="border py-1 px-2 rounded-md my-1">
                <TouchableOpacity onPress={() => connectToDevice(x.item)}>
                  <Text className="font-bold text-lg">
                    {x.item.name ? x.item.name : "Unknown"}
                  </Text>
                  <Text>{x.item.id}</Text>
                </TouchableOpacity>
              </View>
            )}
            estimatedItemSize={100}
          />
        </View>
      </View>
    </View>
  );
}
