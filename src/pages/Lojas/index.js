import React, { useState, useContext, useEffect } from 'react';
import { BoxButtom, ButtomSetores } from '../../components/Buttons';
import HeaderHome from '../../components/Header/Home';
import moment from 'moment';
import { AreaUm, BoxHome, ButtonArea, ContainerText, GraphArea, ScreenArea } from '../style';
import { AuthContext } from '../../contexts/auth';
import MoneyPTBR from '../../components/MoneyPTBR';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Text } from 'react-native';

export default function Lojas() {

  const { user, totais } = useContext(AuthContext);
  const vtotal = totais.filter((dep) => (dep.Departamento === 1));
console.log(vtotal)
  const colorValid = ((value) => {
    if (value <= 90) return "#DC2626";
    if (value <= 98) return "#F18800";
    if (value > 90) return "#10B981";
  });

  const [metaAlc, setMetaAlc] = useState(0);
  const [margem, setMargem] = useState(0);
  const [projecao, setProjecao] = useState(0);

  const vmetaalcancada = (vtotal[0].MetaAlcancada) * 100;
  const vmargem = (vtotal[0].Margem) * 100;
  const vprojecao = (vtotal[0].Projecao) * 100;

  useEffect(() => {
    setMetaAlc(vmetaalcancada);
    setMargem(vmargem);
    setProjecao(vprojecao);
  }, [vmetaalcancada, vmargem, vprojecao])

  return (
    <BoxHome>
      <HeaderHome
        startColor="#014D9B"
        endColor="#0A3B7E"
        textColor="#FFF"
        bgStatus="#0A3B7E"
        barStyle="light-content"
        title="Lojas Solar"
        subTitle="Relatório de Faturamento"
        dtatu={moment(totais[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
      />
      <ScreenArea>

        <GraphArea>
          <AreaUm height="70px" paddingTop="">
            <ContainerText>
              <ContainerText.Title color="#0e98e5">Meta</ContainerText.Title>
              <ContainerText.Value color="#0e98e5"> <MoneyPTBR number={vtotal[0].Meta} /> </ContainerText.Value>
            </ContainerText>
            <ContainerText>
              <ContainerText.Title color={colorValid(vtotal[0].MetaAlcancada)}>Faturamento</ContainerText.Title>
              <ContainerText.Value color={colorValid(vtotal[0].MetaAlcancada)}> <MoneyPTBR number={parseFloat(vtotal[0].Faturamento)} /> </ContainerText.Value>
            </ContainerText>
          </AreaUm>
          <AreaUm><Text>Textohsxhsxhsxasxh</Text></AreaUm>

          <AreaUm height="120px" paddingTop="45px">

            <CircularProgress
              value={metaAlc}
              radius={65}
              duration={2000}
              inActiveStrokeOpacity={0.4}
              progressValueColor={colorValid(metaAlc)}
              activeStrokeColor={colorValid(metaAlc)}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              maxValue={100}
              title={'Meta'}
              titleColor={colorValid(metaAlc)}
              titleFontSize={12}
              progressValueFontSize={30}
              titleStyle={{ fontWeight: 'bold' }}
              valueSuffixStyle={{ fontWeight: 'normal', position: 'absolute', top: 10, right: -18 }}
              valueSuffix={'%'}
            />

          </AreaUm>
          <AreaUm paddingTop="55px">

            <CircularProgress
              value={margem}
              radius={65}
              duration={2000}
              inActiveStrokeOpacity={0.4}
              progressValueColor={colorValid(margem)}
              activeStrokeColor={colorValid(margem)}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              maxValue={100}
              title={'Margem'}
              titleColor={colorValid(margem)}
              titleFontSize={12}
              progressValueFontSize={30}
              titleStyle={{ fontWeight: 'bold' }}
              valueSuffixStyle={{ fontWeight: 'normal', position: 'absolute', top: 10, right: -18 }}
              valueSuffix={'%'}
            />

            <CircularProgress
              value={projecao}
              radius={65}
              duration={2000}
              inActiveStrokeOpacity={0.4}
              progressValueColor={colorValid(projecao)}
              activeStrokeColor={colorValid(projecao)}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              maxValue={100}
              title={'Projeção'}
              titleColor={colorValid(projecao)}
              titleFontSize={12}
              progressValueFontSize={30}
              titleStyle={{ fontWeight: 'bold' }}
              valueSuffixStyle={{ fontWeight: 'normal', position: 'absolute', top: 10, right: -18 }}
              valueSuffix={'%'}
            />

          </AreaUm>

        </GraphArea>
        <ButtonArea>
          <BoxButtom>

            <ButtomSetores
              startColor="#014D9B"
              endColor="#0A3B7E"
              textColor="#FFF"
              icon="ios-list-sharp"
              title="Resumo"
              onPress="LResumo"
            />

            <ButtomSetores
              startColor="#014D9B"
              endColor="#0A3B7E"
              textColor="#FFF"
              icon="ios-logo-usd"
              title="Faturamento"
              onPress="LFaturamento"
            />

            <ButtomSetores
              startColor="#014D9B"
              endColor="#0A3B7E"
              textColor="#FFF"
              icon="ios-basket-outline"
              title="Serviços"
              onPress="LServicos"
            />

            <ButtomSetores
              startColor="#014D9B"
              endColor="#0A3B7E"
              textColor="#FFF"
              icon="md-cart-outline"
              title="Compras"
              onPress="LCompras"
            />

          </BoxButtom>
        </ButtonArea>
      </ScreenArea>
    </BoxHome>
  );
}