import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import Header from 'src/components/Header';
import {useStore} from 'src/stores/StoreProvider';
import {UserDto} from 'src/types/CustomData';
import {CustomStackNavigationParams} from 'src/types/CustomStackNavigationParams';
import styled from 'styled-components/native';

const RegisterScreen = () => {
  const {uiStore} = useStore();

  const navigation =
    useNavigation<StackNavigationProp<CustomStackNavigationParams>>();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [joinData, setJoinData] = useState<UserDto>({});

  const handlePressJoin = () => {
    //
  };

  const checkIsActive = () => {
    const emailReg =
      /^[0-9a-z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (
      joinData.email !== '' &&
      joinData.name !== '' &&
      joinData.password !== '' &&
      emailReg.test(joinData.email)
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  console.log(joinData);

  useEffect(() => {
    checkIsActive();
  }, [joinData]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <Header
            title="회원가입"
            pressBack={() => {
              navigation.navigate('LoginScreen');
            }}
          />
        );
      },
    });

    navigation.addListener('focus', () => {
      uiStore.setIsBottomTabShow(false);
    });
    navigation.addListener('blur', () => {
      uiStore.setIsBottomTabShow(true);
    });
  }, []);

  return (
    <Container>
      <TopContainer>
        <Img source={require('src/assets/images/pet.png')} />
        <CustomText fontSize={16} fontWeight={600}>
          가입하시고 다양한 서비스를 이용해보세요!
        </CustomText>
      </TopContainer>
      <InputContainer>
        <InputWrapper>
          <Label>
            Email <CustomText fontColor="red">*</CustomText>
          </Label>
          <Input
            placeholder="이메일을 입력해주세요"
            onChangeText={(text: string) => {
              setJoinData({...joinData, email: text});
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>
            비밀번호 <CustomText fontColor="red">*</CustomText>
          </Label>
          <Input
            placeholder="비밀번호를 입력해주세요"
            onChangeText={(text: string) => {
              setJoinData({...joinData, password: text});
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>
            이름 <CustomText fontColor="red">*</CustomText>
          </Label>
          <Input
            placeholder="이름을 입력해주세요"
            onChangeText={(text: string) => {
              setJoinData({...joinData, name: text});
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>반려동물 이름</Label>
          <Input
            placeholder="반려동물 이름을 입력해주세요"
            onChangeText={(text: string) => {
              setJoinData({...joinData, petName: text});
            }}
          />
        </InputWrapper>
        <CustomText style={{textAlign: 'right'}} fontColor="#bbbbbb">
          <CustomText fontColor="red">*</CustomText>는 필수항목입니다.
        </CustomText>
      </InputContainer>
      <Btn isActive={isActive} onPress={handlePressJoin}>
        <BtnText>가입하기</BtnText>
      </Btn>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 20px;
  flex: 1;
  justify-content: center;
`;

const TopContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const CustomText = styled.Text<{
  fontSize?: number;
  fontColor?: string;
  fontWeight: number;
}>`
  font-size: ${(props: any) => props.fontSize || 14}px;
  color: ${(props: any) => props.fontColor || 'black'};
  font-weight: ${(props: any) => props.fontWeight || 400};
`;

const Img = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
`;

const InputContainer = styled.View`
  margin: 30px 0 20px;
`;

const InputWrapper = styled.View``;

const Label = styled.Text`
  font-weight: 700;
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  margin: 5px 0 10px;
  padding: 5px 0;
`;

const Btn = styled.TouchableOpacity<{isActive?: boolean}>`
  border-radius: 999px;
  opacity: ${(props: any) => (props.isActive ? 1 : 0.3)};
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background-color: orange;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 16px;
`;

export default RegisterScreen;
