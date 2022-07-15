import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../../../components/Loading';

import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';
export default function CPerformance() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [sComGrafico, setSComGrafico] = useState([]);

  useEffect(() => {

    async function getSComGrafico() {
      setLoading(true);
      await api.get(`scomgrafico/${dtFormatada(dataFiltro)}`)
        .then(scomgrafico => {
          getSComGrafico(scomgrafico.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getSComGrafico();

  }, [dataFiltro]);


  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading />
        :
        <ScrollView>
          {/* Gráfico {sComGrafico} */}
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