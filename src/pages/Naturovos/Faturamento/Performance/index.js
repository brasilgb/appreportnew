import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import Loading from '../../../../components/Loading';
import api from '../../../../services/api';

export default function Performance() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [nfatuTotais, setNfatuTotais] = useState([]);
  const [nfatuGrafico, setNfatuGrafico] = useState([]);

  useEffect(() => {
    async function getNfatuGrafico() {
      setLoading(true);
      await api.get(`nfatugrafico/${dtFormatada(dataFiltro)}`)
        .then(nfatugrafico => {
          setNfatuGrafico(nfatugrafico.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNfatuGrafico();

    async function getNfatuTotais() {
      setLoading(true);
      await api.get(`nfatutotais/${dtFormatada(dataFiltro)}`)
        .then(nfatutotais => {
          setNfatuTotais(nfatutotais.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getNfatuTotais();

  }, [dataFiltro]);


  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading />
        :
        <ScrollView>
          <DataTable style={{ marginBottom: 10 }}>
            <DataTable.Header style={styles.titleTable}>
              <DataTable.Title><Text style={styles.titleText}>Média</Text></DataTable.Title>
            </DataTable.Header>
            {nfatuTotais.map((fatmes, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{<MoneyPTBR number={((fatmes.MediaDia) * 1)} />}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* // Gráfico {nfatuGrafico} */}

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