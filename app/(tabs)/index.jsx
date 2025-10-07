import QuotationCards from "@/components/cards/QuotationCards";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Navbar from "@/components/Navbar";

export default function HomeScreen() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const abortRef = useRef(null);

  const fetchLeads = useCallback(async (opts = {}) => {
    try {
      setError(null);
      if (!opts.silent) setLoading(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const uid = encodeURIComponent("Devesh bisht");
      const res = await axios.get(
        `https://0rq0f90i05.execute-api.ap-south-1.amazonaws.com/salesapp/lead-managment/create-quote?SalesPersonUid=${uid}`,
        { signal: controller.signal }
      );

      const data = res.data;
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data?.leads)) list = data.leads;
      else if (Array.isArray(data?.data)) list = data.data;

      setLeads(list);
    } catch (e) {
      if (axios.isCancel(e)) return;
      console.error("fetchLeads failed:", e.message);
      setError(e.message || "Failed to fetch leads");
      setLeads([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchLeads();
      return () => abortRef.current?.abort();
    }, [fetchLeads])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLeads({ silent: true });
  }, [fetchLeads]);

  const renderItem = ({ item }) => <QuotationCards leadData={item} />;

  const keyExtractor = (item, i) => item?.id?.toString() || i.toString();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-500">Loading leads…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="mt-4 text-lg font-semibold text-gray-900">
          Error Loading Leads
        </Text>
        <Text className="mt-2 text-sm text-gray-500">{error}</Text>
        <TouchableOpacity
          onPress={() => fetchLeads()}
          style={{
            marginTop: 24,
            backgroundColor: "#7c3aed",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Navbar
        title="Journey Readdy"
        subtitle="Explore beautiful destinations"
        showSearch
        showNotifications
      />

      <FlatList
        data={leads}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        initialNumToRender={8}
        windowSize={5}
        maxToRenderPerBatch={8}
        removeClippedSubviews
      />

      {leads.length === 0 && (
        <View className="absolute inset-0 items-center justify-center px-8">
          <Ionicons name="document-outline" size={64} color="#9ca3af" />
          <Text className="mt-4 text-lg font-semibold text-gray-900">
            No Leads Found
          </Text>
          <Text className="mt-2 text-sm text-gray-500 text-center">
            You haven&apos;t created any leads yet. Pull to refresh to try
            again.
          </Text>
        </View>
      )}
    </View>
  );
}
