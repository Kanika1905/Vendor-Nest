import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Verify() {
  const { phone, role } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const verifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    try {
      const url =
        role === "vendor"
          ? "http://172.22.198.215:5000/api/auth/vendor/verify"
          : "http://172.22.198.215:5000/api/auth/wholesaler/verify";

      const res = await axios.post(url, { phone, otp });
      Alert.alert("Success", res.data.message);

      // Navigate to dashboard or home screen
      router.replace("/home"); // you can change this
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Sent to {phone}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", width: "100%", padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
