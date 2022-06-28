import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

export default function SCompDiario() {
  const { nComTipo, nComTotal } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: '#eee' }}>
            <DataTable.Title style={styles.colmedia}>Tipo Prod.</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra dia {nComTotal[0].DiaAtual}</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra Semana</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Compra Mês</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Preço Médio</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
          </DataTable.Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            {nComTotal.map((tot, index) => (
              <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                <DataTable.Cell style={styles.colmedia}>TOTAL</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComCompraDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComCompraSemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.ComCompraMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.ComRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>-</DataTable.Cell>
              </DataTable.Row>
            ))}
            {nComTipo.sort((a, b) => a.CompraMes < b.CompraMes ? 1 : -1).map((fat, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.colmedia}>{fat.MateriaPrima}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraSemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.CompraMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>
                  <Text
                    style={((fat.RepAno) * 100).toFixed() > 0 ? { color: 'green' } : { color: 'red' }}
                  >
                    {((fat.RepAno) * 100).toFixed(2)}%
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PrecoMedio) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>
                  <Text
                    style={((fat.PrecoMedio) * 100).toFixed() > 0 ? { color: 'green' } : { color: 'red' }}
                  >
                    {((fat.RepPrecoMedio) * 100).toFixed(2)}%
                  </Text>
                </DataTable.Cell>
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