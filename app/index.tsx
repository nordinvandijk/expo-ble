import { useMemo, useState } from "react";

import { Switch, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  State,
} from "react-native-ble-plx";

import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView className="bg-neutral-900" edges={["bottom", "left", "right"]}>
      <View className="h-full w-full">
        <Stack.Screen options={{ title: connectedDevice ? connectedDevice.name as string : "Connect to a device" }} />

        <View className="mx-2">
          <View className="w-full h-full">
            <FlashList
              ListHeaderComponent={() => (
                  <View className="flex flex-row items-center justify-between px-4 py-3 my-3 bg-neutral-700 rounded-lg">
                    <Text className="text-lg font-semibold text-white">BLE Scanning</Text>
                    <Switch
                      trackColor={{ false: "#777", true: "#FF69B4" }}
                      thumbColor={"#f4f3f4"}
                      ios_backgroundColor="#777"
                      onValueChange={(value) =>
                        value ? scanForPeripherals() : stopScan()
                      }
                      value={isScanning}
                    />
                  </View>
              )}
              data={allDevices}
              showsVerticalScrollIndicator={false}
              renderItem={(x) => (
                <View className="py-1 px-2 rounded-md my-1">
                  <TouchableOpacity onPress={() => connectToDevice(x.item)}>
                    <Text className="font-bold text-lg text-white">
                      {x.item.name ? x.item.name : "Unknown"}
                    </Text>
                    <Text className="text-white">{x.item.id}</Text>
                  </TouchableOpacity>
                </View>
              )}
              estimatedItemSize={100}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
