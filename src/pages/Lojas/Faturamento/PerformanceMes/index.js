import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';

export default function PerformanceMes() {
  const { fatuPerfMesLojas, fatuTotPerfLojas } = useContext(AuthContext);
  const meslojas = fatuPerfMesLojas.map((fatu) => (fatu));
  const mestotlojas = fatuTotPerfLojas.map((fatut) => (fatut));

  return (
    <View style={styles.container}>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: '#eee' }}>
            <DataTable.Title style={styles.colpequena}>Mês/Ano</DataTable.Title>
            <DataTable.Title style={styles.colgrande}>Meta</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Média Fat.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.Fat.</DataTable.Title>
            <DataTable.Title style={styles.colmedia}>Meta</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Med.Jur.s/Parc.</DataTable.Title>
            <DataTable.Title style={styles.colpequena}>Rep.Juros</DataTable.Title>
          </DataTable.Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            {mestotlojas.map((tot, index) => (
              <DataTable.Row key={index} style={{ backgroundColor: '#f1f1f1' }}>
                <DataTable.Cell style={styles.colpequena}>TOTAL</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((tot.MetaMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MediaFatuMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.RepFatuMes) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.MetaAlcancadaMes) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((tot.MedJurSParcMes) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((tot.RepJurosMes) * 100).toFixed(2)}%</DataTable.Cell>
              </DataTable.Row>
            ))}
            {meslojas.map((mes, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.colpequena}>{mes.MesAno}</DataTable.Cell>
                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={((mes.Meta) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>
                  <Text
                    style={((mes.MediaFatu) * 1) > ((mes.ColorMedia) * 1) ? { color: 'green' } : { color: 'red' }}
                  >
                    {<MoneyPTBR number={((mes.MediaFatu) * 1)} />}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((mes.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((mes.RepFatu) * 100).toFixed(2)}%</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>
                  <Text
                    style={((mes.MetaAlcancada) * 100).toFixed() > 100 ? { color: 'green' } : { color: 'red' }}
                  >
                    {((mes.MetaAlcancada) * 100).toFixed(2)}%
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((mes.MedJurSParc) * 1)} />}</DataTable.Cell>
                <DataTable.Cell style={styles.colpequena}>{((mes.RepJuros) * 100).toFixed(2)}%</DataTable.Cell>
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
    width: 80,
    paddingHorizontal: 2
  },
  colmin: {
    width: 50,
    paddingHorizontal: 2
  }
});