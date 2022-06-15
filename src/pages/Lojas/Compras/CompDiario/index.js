import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

export default function SCompDiario() {
  const { comComparaDia, comTotais } = useContext(AuthContext);
  const comparadia = comComparaDia.map((fatu) => (fatu));

  return (
    <View style={styles.container}>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: '#eee' }}>
            <DataTable.Title style={styles.colpequena}>Ass.</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra dia {comTotais[0].DiaAtual}</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra dia  {comTotais[0].DiaAnterior}</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra Semana</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra Mês</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Prazo Médio</DataTable.Title>
          </DataTable.Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            {comTotais.map((tot, index) => (
              <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                <DataTable.Cell style={styles.colpequena}>TOTAL</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraAnterior) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.CompraSemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.CompraMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.Rep) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{parseInt(tot.PrazoMedio)}</DataTable.Cell>
              </DataTable.Row>
            ))}
            {comparadia.map((fat, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.colpequena}>{fat.Assoc}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraAnterior) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraSemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((fat.CompraMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>
                  <Text
                    style={((fat.ColorRep) * 100).toFixed() > 0 ? { color: 'green' } : { color: 'red' }}
                  >
                    {((fat.Rep) * 100).toFixed(2)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{parseInt(fat.PrazoMedio)}</DataTable.Cell>
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
    width: 120,
    paddingHorizontal: 2
  },
  colpequena: {
    width: 90,
    paddingHorizontal: 2
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2
  }
});