import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import MoneyPTBR from '../../../../components/MoneyPTBR';
import { AuthContext } from '../../../../contexts/auth';

export default function Filial() {

    const { filiais, totais } = useContext(AuthContext);
    const vfilial = filiais.filter((fil) => (fil.Departamento === 1));
    const vtotal = totais.filter((fl) => (fl.Departamento === 1));
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <DataTable>
                    <DataTable.Header style={{ backgroundColor: '#E5E5EA' }}>
                        <DataTable.Title style={styles.colgrande}>Filial.</DataTable.Title>
                        <DataTable.Title style={styles.colgrande}>Faturamento</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Rep.Fat</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Proj.</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Margem</DataTable.Title>
                        <DataTable.Title style={styles.colpequena}>Meta</DataTable.Title>
                    </DataTable.Header>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {vtotal.map((tot, index) => (
                            <DataTable.Row key={index} style={{ backgroundColor: '#E5E5EA' }}>
                                <DataTable.Cell style={styles.colgrande}>Total</DataTable.Cell>
                                <DataTable.Cell style={styles.colgrande}><MoneyPTBR number={parseFloat(tot.Faturamento)} /></DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((1) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((tot.Projecao) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((tot.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((tot.MetaAlcancada) * 100).toFixed(2)}%</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                        {vfilial.map((fil, index) => (
                            <DataTable.Row key={index} style={{ backgroundColor:  index%2 === 0 ? '#F3F4F6' : '#F9FAFB' }}>
                                <DataTable.Cell style={styles.colgrande}>{fil.Filial}</DataTable.Cell>
                                <DataTable.Cell style={styles.colgrande}>{<MoneyPTBR number={parseFloat(fil.Faturamento)} />}</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.RepFaturamento) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.Projecao) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.Margem) * 100).toFixed(2)}%</DataTable.Cell>
                                <DataTable.Cell style={styles.colpequena}>{((fil.MetaAlcancada) * 100).toFixed(2)}%</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </ScrollView>
                </DataTable>
            </ScrollView >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: 0
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
    }
});
