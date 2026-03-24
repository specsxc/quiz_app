import supabase from "../supabase-client";

export default function AuthContext() {
  const testConnection = async () => {
    const { data, error } = await supabase.from("test-table").select("*");

    if (error) {
      console.error("Błąd połączenia z Supabase:", error.message);
    } else {
      console.log("Połączenie udane! Dane:", data);
    }
  };
  testConnection();
  return <div>AuthContext</div>;
}
