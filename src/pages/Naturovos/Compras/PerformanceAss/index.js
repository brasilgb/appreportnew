import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import MoneyPTBR from '../../../../components/MoneyPTBR';

export default function CPerformanceAss() {
  const { nComPerfTipo, nComTotal } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{backgroundColor: '#eee'}}>
            <DataTable.Title style={styles.colpequena}>Tipo Produto.</DataTable.Title>
            <DataTable.Title style={styles.colgrande}>Compras</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
            <DataTable.Title style={styles.colgrande}>Compras + EC</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Rep. Total + EC</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Preço Médio + EC</DataTable.Title>
          </DataTable.Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            {nComTotal.map((tot, index) => (
              <DataTable.Row key={index} style={{backgroundColor: '#f1f1f1'}}>
                <DataTable.Cell style={styles.colpequena}>TOTAL</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.PerCompra) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.PerRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.PerCompraEC) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{((tot.PerRepTotalEC) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>-</DataTable.Cell>
                
              </DataTable.Row>
            ))}
            {nComPerfTipo.sort((a, b) => a.Compra < b.Compra ? 1 : -1).map((fat, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.colpequena}>{fat.MateriaPrima}</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.Compra) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.CompraEC) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{((fat.RepTotalEC) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.PrecoMedioEC) * 1)} />}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  colgrande: {
    width: 180,
    paddingHorizontal: 2
  },
  colmedia: {
    width: 150,
    paddingHorizontal: 2
  },
  colpequena: {
    width: 80,
    paddingHorizontal: 2
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2
  },
  titleTable: {
    backgroundColor: "#29ABE2",
    borderRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});