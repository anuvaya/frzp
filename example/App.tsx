import FlexibleRazorPay, { FlexibleRazorPayView } from "frzp"
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Group name="Async functions">
          <Button
            title="Set value"
            onPress={async () => {
              // await FlexibleRazorPay.setValueAsync('Hello from JS!');
              try {
                const data = await FlexibleRazorPay.open({
                  key: "rzp_test_ScKbp9onKbeQ8o",
                  amount: 100_00,
                  currency: "INR",
                })
                console.log(data)
              } catch (error) {
                console.log(error)
              }
            }}
          />
        </Group>
      </ScrollView>
    </SafeAreaView>
  )
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  )
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
}
