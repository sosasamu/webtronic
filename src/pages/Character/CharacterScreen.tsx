import React from 'react';
import { CharacterDetails } from '../../components/Character/CharacterDetails';

export const CharacterScreen = ({ route, navigation }) => {
  const { characterId } = route.params;
  return <CharacterDetails characterId={characterId} navigation={navigation} />;
};
