import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import moment from 'moment';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';
import { ScrollView } from 'react-native-gesture-handler';

export default function ResumoDiario() {

    const { sFatComparativo, sFatTotais } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable>
                    
                    <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                        <DataTable.Title style={styles.colpequena}>Ass.</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Venda Dia {sFatTotais[0].DiaAtual}</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Venda dia  {sFatTotais[0].DiaAnterior}</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Venda Semana</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Venda Mês</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Rep.</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
                        <DataTable.Title style={styles.colmedia}>Meta</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>-</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {sFatTotais.map((fat, index) => (
                            <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                <DataTable.Cell style={styles.colpequena}>TOTAL</DataTable.Cell>
                                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaDia) * 1)} />}</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fat.MargemDia) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaAnterior) * 1)} />}</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fat.MargemAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaSemana) * 1)} />}</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fat.MargemSemana) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaMes) * 1)} />}</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fat.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}></DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fat.RepVendaMes) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}></DataTable.Cell>
                                <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.ValorMeta) * 1)} />}</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fat.RepSobreMeta) * 100).toFixed(2)}%</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                        {sFatComparativo
                            .sort((a, b) => (parseFloat(a.VendaMes) < parseFloat(b.VendaMes)) ? 1 : -1)
                            .map((fat, index) => (
                                <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                    <DataTable.Cell style={styles.colpequena}>{fat.Associacao}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaDia) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemDia) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaAnterior) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemAnterior) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaSemana) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemSemana) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.VendaMes) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.MargemMes) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>
                                        <Text
                                            style={((fat.RepMargemMesAno) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                        >
                                            {((fat.RepMargemMesAno) * 100).toFixed(2)}%
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepFatMes) * 100).toFixed(2)}%</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>
                                        <Text
                                            style={((fat.RepFatMesAno) * 100).toFixed(2) > 0 ? { color: 'green' } : { color: 'red' }}
                                        >
                                            {((fat.RepFatMesAno) * 100).toFixed(2)}%
                                        </Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.colmedia}>{<MoneyPTBR number={((fat.Meta) * 1)} />}</DataTable.Cell>
                                    <DataTable.Cell style={styles.colpequena}>{((fat.RepMesMeta) * 100).toFixed(2)}%</DataTable.Cell>
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