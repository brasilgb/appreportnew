import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

export default function SCompDiario() {
  const { serResumoDia, serTotais, totais } = useContext(AuthContext);
  const reservicos = serResumoDia.map((fatu) => (fatu));
  const dtatualizacao = serTotais.map((fatu) => (fatu.Atualizacao));
  const diavenda = moment(dtatualizacao.toString()).format('D');

  return (
    <View style={styles.container}>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{backgroundColor: '#eee'}}>
            <DataTable.Title style={styles.colmedia}>Regional</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>GE Dia {totais[0].DataAtual}</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>PP dia  {diavenda}</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>GE Sem.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>PP Sem.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>GE Mês</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>PP Mês</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>AP Mês</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Total Serviços</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>

          </DataTable.Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            {serTotais.map((tot, index) => (
              <DataTable.Row key={index} style={{backgroundColor: '#f1f1f1'}}>
                <DataTable.Cell style={styles.colmedia}>TOTAL</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.GEDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.PPDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.GESemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.PPSemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.GEMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.GEMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.PPMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.PPMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.APMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.APMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((tot.TotServicos) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.TotRep) * 100).toFixed(2)}%</DataTable.Cell>
              </DataTable.Row>
            ))}
            {reservicos.map((fat, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.colmedia}>{fat.Supervisor}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.GEDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PPDia) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.GESemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PPSemana) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.GEMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fat.GEMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.PPMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fat.PPMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.APMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fat.APMesRep) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{<MoneyPTBR number={((fat.TotServicos) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((fat.TotRep) * 100).toFixed(2)}%</DataTable.Cell>
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
    width: 100,
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