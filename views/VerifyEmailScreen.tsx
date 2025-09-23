import { useAuth } from "@/contexts/authContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContainerGlobalClean from "@/layout/ContainerGlobalClean";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function VerifyEmailScreen() {
  const { theme } = useThemeColor();
  const { sendVerificationEmail, loading, emailSent, error } = useAuth();
  return (
    <ContainerGlobalClean>
      <View style={styles.container}>
        <Text style={[styles?.pageTitle, { color: theme.primary }]}>
          Verify Email
        </Text>
        <Text style={[styles.subTitle, { color: theme.primary }]}>
          Please verify your email address
        </Text>
        <Text style={[styles.details, { color: theme.text }]}>
          We&apos;ve sent a verification email to your inbox. Please check your
          email and click the link to verify your account.
        </Text>
        <Pressable
          onPress={() => sendVerificationEmail()}
          disabled={loading || emailSent}
          style={[styles.sent_button, { backgroundColor: theme.primary }]}
        >
          <View>
            <Text style={[styles?.button_text, { color: theme.background }]}>
              {loading
                ? "Loading..."
                : emailSent
                ? "Verification Email Sent"
                : "Resend Verification Email"}
            </Text>
          </View>
        </Pressable>
        {error && <Text style={[]}>{error?.message}</Text>}
      </View>
    </ContainerGlobalClean>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 24,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    fontSize: 16,
    textAlign: "center",
  },
  sent_button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button_text: {
    fontSize: 18,
    fontWeight: "600",
  },
  error_text: {
    textAlign: "center",
  },
});
