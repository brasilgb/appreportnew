import React, { useState, useContext, useEffect } from 'react';
import { BoxButtom, ButtomSetores } from '../../components/Buttons';
import HeaderHome from '../../components/Header/Home';
import moment from 'moment';
import { AreaUm, BoxHome, ButtonArea, ContainerText, GraphArea, ScreenArea } from '../style';
import { AuthContext } from '../../contexts/auth';
import MoneyPTBR from '../../components/MoneyPTBR';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function Naturovos() {

  const { totais } = useContext(AuthContext);
  const vtotal = totais.filter((dep) => (dep.Departamento === 2)).map(tot => tot);

  const colorValid = ((value) => {
    if (value <= 90) return "#DC2626";
    if (value <= 98) return "#F18800";
    if (value > 90) return "#10B981";
  });


  const [margem, setMargem] = useState(0);
  const [projecao, setProjecao] = useState(0);

  const vmargem = (vtotal[0].Margem) * 100;
  const vprojecao = (vtotal[0].Projecao) * 100;
  useEffect(() => {
    setMargem(vmargem);
    setProjecao(vprojecao);
  }, [vmargem, vprojecao])

  return (
    <BoxHome>
      <HeaderHome
        startColor="#FF710F"
        endColor="#f26000"
        textColor="#FFF"
        bgStatus="#f26000"
        barStyle="ligth-content"
        title="Supermercados"
        subTitle="Resumo de Faturamento"
        dtatu={moment(vtotal[0].Atualizacao).format('DD/MM/YYYY HH:mm:ss')}
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

          <AreaUm height="120px" paddingTop="40px">
            <ContainerText>
              <ContainerText.Title color="#555" style={{ fontSize: 18 }}>Ticket Médio</ContainerText.Title>
              <ContainerText.Value color="#555" style={{ fontSize: 40, fontWeight: 'bold' }}> <MoneyPTBR number={parseFloat(vtotal[0].TicketMedio)} /> </ContainerText.Value>
            </ContainerText>

          </AreaUm>
         
          <AreaUm paddingTop="45px">

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
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="ios-list-sharp"
              title="Resumo"
              onPress="ResumoSuper"
            />

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="ios-logo-usd"
              title="Faturamento"
              onPress="SFaturamento"
            />

            <ButtomSetores
              startColor="#FF710F"
              endColor="#f26000"
              textColor="#FFF"
              icon="md-cart-outline"
              title="Compras"
              onPress="SCompras"
            />

          </BoxButtom>

        </ButtonArea>
      </ScreenArea>
    </BoxHome>
  );
}