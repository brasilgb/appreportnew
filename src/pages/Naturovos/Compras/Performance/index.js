import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AuthContext } from '../../../../contexts/auth';
import api from '../../../../services/api';
export default function CPerformance() {
  
  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [nComGrafico, setNComGrafico] = useState([]);

  useEffect(() => {
    async function getNfatuGrafico() {
        await api.get(`nfatugrafico/${dtFormatada(dataFiltro)}`)
            .then(nfatugrafico => {
              setNComGrafico(nfatugrafico.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    getNfatuGrafico();
}, [dataFiltro]);

  return (
    <View style={styles.container}>

      <ScrollView>
        {/*  Gráfico */}
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