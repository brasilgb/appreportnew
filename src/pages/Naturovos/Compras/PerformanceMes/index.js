import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';

export default function CPerformanceMes() {
  // const { nComPerfMes, nComTotal } = useContext(AuthContext);

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [nComPerfMes, setNComPerfMes] = useState([]);
  const [nComTotal, setNComTotal] = useState([]);

  // Extração de dados resumos Faturamento e gráfico de evolução
  useEffect(() => {
    async function getNComPerfMes() {
      setLoading(true);
      await api.get(`ncomperfmes/${dtFormatada(dataFiltro)}`)
        .then(ncomperfmes => {
          setNComPerfMes(ncomperfmes.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNComPerfMes();

    async function getNComTotal() {
      setLoading(true);
      await api.get(`ncomtotal/${dtFormatada(dataFiltro)}`)
        .then(ncomtotal => {
          setNComTotal(ncomtotal.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNComTotal();

  }, [dataFiltro]);

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading />
        :
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <DataTable>
            <DataTable.Header style={{ backgroundColor: '#eee' }}>
              <DataTable.Title style={styles.colmedia}>Mês/Ano.</DataTable.Title>
              <DataTable.Title style={styles.colmedia}>Média Compras</DataTable.Title>
              <DataTable.Title style={styles.colpequena}>Rep. Total</DataTable.Title>
            </DataTable.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
              {nComTotal.map((tot, index) => (
                <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                  <DataTable.Cell style={styles.colmedia}>Média</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MesMedia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((tot.MesRepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
              {nComPerfMes.map((fat, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colmedia}>{fat.MesAno}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((fat.Media) * 1) > ((fat.ColorMedia) * 1) ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((fat.Media) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fat.RepTotal) * 100).toFixed(2)}%</DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </DataTable>
        </ScrollView>
      }

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