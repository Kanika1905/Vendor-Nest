import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("vendor"); // default role
  const router = useRouter();

  const sendOtp = async () => {
    if (!phone) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    try {
      const url =
        role === "vendor"
          ? "http://172.22.198.215:5000/api/auth/vendor/login"
          : "http://172.22.198.215:5000/api/auth/wholesaler/login";

      const res = await axios.post(url, { phone });
      Alert.alert("Success", res.data.message);

      // Navigate to Verify screen with phone & role
      router.push({
        pathname: "/verify",
        params: { phone, role },
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Phone</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity onPress={() => setRole("vendor")} style={[styles.roleBtn, role === "vendor" && styles.active]}>
          <Text style={styles.roleText}>Vendor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole("wholesaler")} style={[styles.roleBtn, role === "wholesaler" && styles.active]}>
          <Text style={styles.roleText}>Wholesaler</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={sendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", width: "100%", padding: 12, borderRadius: 8, marginBottom: 20 },
  roleContainer: { flexDirection: "row", marginBottom: 20 },
  roleBtn: { padding: 10, marginHorizontal: 5, borderWidth: 1, borderRadius: 8, borderColor: "#666" },
  active: { backgroundColor: "#007bff" },
  roleText: { color: "#fff" },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
