import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';

export default function NGrafEvolucao() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [nResGrafico, setNResGrafico] = useState([]);
  const [nResTotal, setNResTotal] = useState([]);

  // Extração de dados resumos totais
  useEffect(() => {
    async function getNResGrafico() {
      setLoading(true);
      await api.get(`nresgrafico/${dtFormatada(dataFiltro)}`)
        .then(nresgrafico => {
          setNResGrafico(nresgrafico);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNResGrafico();

    async function getNResTotal() {
      setLoading(true);
      await api.get(`nrestotais/${dtFormatada(dataFiltro)}`)
        .then(nrestotais => {
          setNResTotal(nrestotais.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNResTotal();

  }, [dataFiltro]);

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading />
        :
        <ScrollView>

          {nResTotal.map((fatmes, index) => (
            <DataTable key={index} style={{ marginBottom: 10 }}>

              <DataTable.Header style={styles.titleTable}>
                <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloProjecao}</Text></DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>{<MoneyPTBR number={((fatmes.ProjecaoFaturamento) * 1)} />}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Header style={styles.titleTable}>
                <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloDif}</Text></DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>{((fatmes.DifMesAntAtual) * 100).toFixed()}%</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Header style={styles.titleTable}>
                <DataTable.Title><Text style={styles.titleText}>{fatmes.TituloGrafico}</Text></DataTable.Title>
              </DataTable.Header>
            </DataTable>
          ))}

          {/* Gráfico {nResGrafico} */}

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
    color: "#FFF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  titleText: {
    color: "#FFF"
  }
});