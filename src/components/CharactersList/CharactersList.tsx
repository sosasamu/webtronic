import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import tw from 'twrnc';
import { useGetCharactersQuery } from '../../services/characters';
import { Character } from '../../services/types';
import { HorizontalCard } from '../Card/HorizontalCard';

const alreadyLoaded = (
  data: Character[],
  charactersList: Character[] | [],
): boolean => {
  return data.some(item =>
    charactersList.some(character => character.id === item.id),
  );
};

export const CharactersList = ({ navigation }) => {
  const [page, setPage] = useState<string>('1');
  const [charactersList, setCharactersList] = useState<Character[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isLoading } = useGetCharactersQuery(page);

  useEffect(() => {
    setLoading(isLoading);
    if (isLoading || !data) return;

    // check if data is already loaded in the state
    if (alreadyLoaded(data.results, charactersList)) return;

    setCharactersList(charactersList => [...charactersList, ...data.results]);
  }, [isLoading, data, charactersList]);

  const nextPage = useCallback(
    () =>
      data?.info.next ? setPage((parseInt(page, 10) + 1).toString()) : null,
    [data?.info.next, page],
  );

  return (
    <View style={tw`px-2`}>
      <FlatList
        refreshing={loading}
        data={charactersList}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => nextPage()}
        renderItem={({ item }) => (
          <HorizontalCard navigation={navigation} character={item} />
        )}
      />
    </View>
  );
};
