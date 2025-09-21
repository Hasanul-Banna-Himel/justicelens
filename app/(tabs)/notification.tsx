import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { db } from "@/utils/firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  DocumentData,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { useNudgeModal } from "@/contexts/nudgeModalContext";

// Notifications Component
const NotificationsList = () => {
  const theme = useThemeColor();
  const { user } = useAuth();
  const { showNudgeModal } = useNudgeModal(); // Use the modal context
  const [notifications, setNotifications] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return setLoading(false);
    const q = query(
      collection(db, "notifications"),
      where("recipientUid", "==", user.uid),
      orderBy("sentAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user?.uid]);

  const handleStatusUpdate = async (id: string, status: "ACCEPTED" | "DECLINED") => {
    const notificationRef = doc(db, "notifications", id);
    try {
      await updateDoc(notificationRef, { status });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color={theme.primary} />;
  if (notifications.length === 0) return <Text style={[styles.emptyText, {color: theme.text}]}>You have no notifications.</Text>;

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => showNudgeModal(item)} style={styles.itemContainer}>
          <FontAwesome5 name="bell" size={24} color={theme.text} />
          <View style={styles.itemTextContainer}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{item.message?.title}</Text>
            <Text style={[styles.itemDesc, { color: theme.secondary }]}>{item.message?.body}</Text>
            {item.status === "SENT" ? (
              <View style={styles.actionsContainer}>
                <Pressable style={[styles.button, styles.acceptButton]} onPress={() => handleStatusUpdate(item.id, "ACCEPTED")}>
                  <Text style={styles.buttonText}>Accept</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.declineButton]} onPress={() => handleStatusUpdate(item.id, "DECLINED")}>
                  <Text style={styles.buttonText}>Decline</Text>
                </Pressable>
              </View>
            ) : (
              <Text style={[styles.statusText, {color: item.status === 'ACCEPTED' ? 'green' : 'red'}]}>{item.status}</Text>
            )}
          </View>
        </Pressable>
      )}
    />
  );
};

// Travel History Component
const TravelLogsList = () => {
  const theme = useThemeColor();
  const { user } = useAuth();
  const [logs, setLogs] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return setLoading(false);
    const q = query(
      collection(db, "traveled_with"),
      where("userUid", "==", user.uid),
      orderBy("traveledAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user?.uid]);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color={theme.primary} />;
  if (logs.length === 0) return <Text style={[styles.emptyText, {color: theme.text}]}>You have no travel history.</Text>;

  return (
    <FlatList
      data={logs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const date = (item.traveledAt as Timestamp)?.toDate().toLocaleDateString();
        return (
          <View style={styles.itemContainer}>
            <FontAwesome5 name="history" size={24} color={theme.text} />
            <View style={styles.itemTextContainer}>
              <Text style={[styles.itemDesc, { color: theme.text }]}>
                You traveled with <Text style={styles.boldText}>{item.traveledWithName}</Text> on {date}.
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
};

// Main Screen with State-Based Tabs
export default function NotificationScreen() {
  const theme = useThemeColor();
  const [activeTab, setActiveTab] = useState("notifications");

  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>Activity</Text>
      </View>
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setActiveTab("notifications")}
          style={[
            styles.tabButton,
            activeTab === "notifications" && [styles.activeTab, {borderColor: theme.primary}],
          ]}
        >
          <Text style={[styles.tabText, {color: theme.text}]}>Notifications</Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("history")}
          style={[
            styles.tabButton,
            activeTab === "history" && [styles.activeTab, {borderColor: theme.primary}],
          ]}
        >
          <Text style={[styles.tabText, {color: theme.text}]}>History</Text>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        {activeTab === "notifications" ? <NotificationsList /> : <TravelLogsList />}
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  headerContainer: { justifyContent: "center", alignItems: "center", marginBottom: 12 },
  pageTitle: { fontSize: 18, fontWeight: "bold" },
  tabContainer: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 12 },
  tabButton: { flex: 1, padding: 12, alignItems: "center", borderBottomWidth: 2, borderColor: "transparent" },
  activeTab: { borderBottomWidth: 2 },
  tabText: { fontSize: 16, fontWeight: "600" },
  contentContainer: { flex: 1, paddingHorizontal: 16 },
  loader: { marginTop: 20 },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16 },
  itemContainer: { flexDirection: "row", alignItems: "center", gap: 16, marginVertical: 12, padding: 10, borderRadius: 8, backgroundColor: '#f9f9f9' },
  itemTextContainer: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  itemDesc: { fontSize: 14, lineHeight: 20 },
  boldText: { fontWeight: "bold" },
  actionsContainer: { flexDirection: 'row', gap: 10, marginTop: 10 },
  button: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  acceptButton: { backgroundColor: 'green' },
  declineButton: { backgroundColor: 'red' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  statusText: { marginTop: 10, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic' },
});
