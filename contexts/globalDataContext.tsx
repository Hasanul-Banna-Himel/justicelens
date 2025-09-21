import { globalDataContextProps, globalDBData } from "@/types";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

const GlobalDataContext = createContext<globalDataContextProps | undefined>(
  undefined
);

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [semester, setSemester] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const constDoc = await getDoc(doc(db, "global_consts", "constants"));
        const constData = constDoc.exists()
          ? (constDoc.data() as globalDBData)
          : null;
        if (constData) {
          setSemester(constData?.semester);
        }
      } catch (e) {
        console.error(e);
        Alert.alert(
          "Error",
          `An unexpected error occurred: ${JSON.stringify(
            e
          )}. Please try again.`
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        semester,
        loading,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalDataContext = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error(
      "useGlobalDataContext must be used within an GlobalDataProvider"
    );
  }
  return context;
};
