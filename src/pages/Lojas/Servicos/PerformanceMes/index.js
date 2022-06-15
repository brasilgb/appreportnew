import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import AP from './AP';
import EP from './EP';
import GE from './GE';
import Mes from './Mes';
import PP from './PP';

export default function SPerformanceMes() {

  const { serTotais } = useContext(AuthContext);
  const sertotlojas = serTotais.map((tot) => (tot));

  return (
    <View style={styles.container}>

      <DataTable.Row style={styles.titleTable}>
        <DataTable.Cell style={styles.titleText}>
          <Text style={styles.titleText}>Performance Mês GE, PP, AP e EP</Text>
        </DataTable.Cell>
      </DataTable.Row>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Mes data={sertotlojas} />
        </View>
        <View>
          <GE data={sertotlojas} />
        </View>
        <View>
          <PP data={sertotlojas} />
        </View>
        <View>
          <AP data={sertotlojas} />
        </View>
        <View>
          <EP data={sertotlojas} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
    paddingTop: 10
  },
  titleTable: {
    backgroundColor: "#29ABE2",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});