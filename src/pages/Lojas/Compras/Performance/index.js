import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';

export default function CPerformance() {

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [comGrafico, setComGrafico] = useState(0);

  // Extração de dados resumos totais
  useEffect(() => {
      async function getComGrafico() {
        setLoading(true);
        await api.get(`comgrafico/${dtFormatada(dataFiltro)}`)
          .then(comgrafico => {
            setComGrafico(comgrafico.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getComGrafico();
    }, [dataFiltro]);

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading />
        :
        <ScrollView>
          {/* Gráfico {comGrafico}*/}<Text>Gráfico</Text>
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