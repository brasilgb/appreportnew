import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Dia from './Dia';
import GEDia from './GE';
import PPDia from './PP';
import api from '../../../../services/api';
import Loading from '../../../../components/Loading';
export default function SPerformanceDia() {

  // const { serTotais, serGrafico } = useContext(AuthContext);

  const { dtFormatada, dataFiltro } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [serGrafico, setSerGrafico] = useState([]);
  const [serTotais, setSerTotais] = useState([]);

  // Extração de dados serviços lojas
  useEffect(() => {
      async function getSerGrafico() {
        setLoading(true);
        await api.get(`sergrafico/${dtFormatada(dataFiltro)}`)
          .then(sergrafico => {
            setSerGrafico(sergrafico.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSerGrafico();

      async function getSerTotais() {
        setLoading(true);
        await api.get(`sertotais/${dtFormatada(dataFiltro)}`)
          .then(sertotais => {
            setSerTotais(sertotais.data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          })
      }
      getSerTotais();

    }, [dataFiltro]);

  return (
    <View style={styles.container}>
      {loading
        ?
        <Loading />
        :
        <Fragment>
          <DataTable.Row style={styles.titleTable}>
            <DataTable.Cell style={styles.titleText}>
              <Text style={styles.titleText}>Performance do Dia {'diaatual'}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Dia data={serTotais} />
            </View>
            <View>
              <GEDia data={serTotais} />
            </View>
            <View>
              <PPDia data={serTotais} />
            </View>
            {/* Gráfico {serGrafico} */}
          </ScrollView>
        </Fragment>
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