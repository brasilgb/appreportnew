import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../../../components/Loading';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../../../services/api';

export default function Performance() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [fatuTotLojas, setFatuTotLojas] = useState([]);
  const [fatuGrafLojas, setFatuGrafLoja] = useState([]);

  // Extração de dados resumos Faturamento e gráfico de evolução
  useEffect(() => {
    async function getFatuGrafLojas() {
      setLoading(true);
      await api.get(`fatugraflojas/${dtFormatada(dataFiltro)}`)
        .then(fatugraflojas => {
          setFatuGrafLoja(fatugraflojas.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getFatuGrafLojas();
 
    async function getFatuTotLojas() {
      setLoading(true);
      await api.get(`fatutotlojas/${dtFormatada(dataFiltro)}`)
        .then(fatutotlojas => {
          setFatuTotLojas(fatutotlojas.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getFatuTotLojas();

  }, [dataFiltro]);

  return (
    <View style={styles.container}>

      {loading
        ?
        <Loading />
        :
        <ScrollView>
          <DataTable.Row style={styles.titleTable}>
            <DataTable.Cell><Text style={styles.titleText}>Performance do Mês</Text></DataTable.Cell>
          </DataTable.Row>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

            <DataTable style={{ marginBottom: 10 }}>
              <DataTable.Header style={{ backgroundColor: '#eee' }}>
                <DataTable.Title style={styles.colmedia}>Meta</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Venda</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Meta Parcial</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Atingido</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Perf.Atual</DataTable.Title>
              </DataTable.Header>
              {fatuTotLojas.map((fatmes, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatmes.MetaMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatmes.VendaMes) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((fatmes.FaltaVenderMes) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((fatmes.FaltaVenderMes) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fatmes.MetaParcMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>{((fatmes.AtingidoMes) * 100).toFixed(2)}%</DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={((fatmes.PerfAtualMes) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((fatmes.PerfAtualMes) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>

          <DataTable.Row style={styles.titleTable}>
            <DataTable.Cell style={styles.titleText}><Text style={styles.titleText}>Performance do Dia {'diavenda'}</Text></DataTable.Cell>
          </DataTable.Row>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <DataTable style={{ marginBottom: 20 }}>

              <DataTable.Header style={{ backgroundColor: '#eee' }}>
                <DataTable.Title style={styles.colmedia}>Meta</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Venda</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Falta Vender</DataTable.Title>
                <DataTable.Title style={styles.colpequena}>Perf.Meta Dia</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Juros s/Parc.Dia</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Perf.Jur.Dia</DataTable.Title>
                <DataTable.Title style={styles.colmedia}>Média Dia</DataTable.Title>
              </DataTable.Header>
              {fatuTotLojas.map((fatdia, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.MetaDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.VendaDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((fatdia.FaltaVenderDia) * 1) > 0 ? { color: 'green' } : { color: 'red' }}
                    >
                      {<MoneyPTBR number={((fatdia.FaltaVenderDia) * 1)} />}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colpequena}>
                    <Text
                      style={((fatdia.PerfMetaDia) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((fatdia.PerfMetaDia) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.JurSParcDia) * 1)} />}</DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>
                    <Text
                      style={((fatdia.PerfJurDia) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                    >
                      {((fatdia.PerfJurDia) * 100).toFixed(2)}%
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fatdia.MediaDia) * 1)} />}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>

          {/* Gráfico {fatuGrafLojas}*/}

        </ScrollView>

      }
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
  colgrande: {
    width: 180,
    paddingHorizontal: 2
  },
  colmedia: {
    width: 120,
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
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});