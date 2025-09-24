import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { db } from "@/utils/firebase";
import { Image } from "expo-image";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ContactsScreen() {
  const { theme } = useThemeColor();
  const { user, DBuser } = useAuth(); // Get DBuser to access schedule
  const [users, setUsers] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const contactsQuery = collection(db, "users", user.uid, "contacts");
    const unsubscribe = onSnapshot(contactsQuery, async (snapshot) => {
      setLoading(true);
      const contactIds = snapshot.docs.map((doc) => doc.id);

      if (contactIds.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      const usersQuery = query(
        collection(db, "users"),
        where("uid", "in", contactIds)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const fetchedUsers = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(fetchedUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const renderItem = ({ item }: { item: DocumentData }) => (
    <View style={[styles.contactContainer]}>
      <Image
        source={
          item.gender === "male"
            ? require("@/assets/images/auth/male.png")
            : require("@/assets/images/auth/female.png")
        }
        style={styles.image}
        contentFit="cover"
      />
      <View style={[styles.contactContent]}>
        <Text style={[styles.contactTitle, { color: theme.text }]}>
          {item.displayName || "N/A"}
        </Text>
        <Text style={[styles.contactDesc, { color: theme.secondary }]}>
          {item.email}
        </Text>
      </View>
    </View>
  );

  return (
    <ContainerGlobalClean>
      <View style={styles.headerContainer}>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Contacts
        </Text>
      </View>
      <View style={[styles?.container]}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} />
        ) : users.length > 0 ? (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              You have no contacts.
            </Text>
          </View>
        )}
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  contactDesc: {
    fontSize: 14,
  },
  post_button: {
    paddingVertical: Platform.OS === "android" ? 6 : 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  post_button_text: {
    fontSize: 14,
    fontWeight: 500,
  },
});
