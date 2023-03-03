import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc';
import { useGetCharacterQuery } from '../../services/characters';
import { useGetEpisodeQuery } from '../../services/episodes';
import { Character, Episode } from '../../services/types';
import {
  TextCustomComponent,
  TextSmallComponent,
  TextSubtitleComponent,
  TextTitleComponent,
} from '../Text/TextComponent';

export interface CharacterDetailsProps {
  characterId: string;
  navigation: any;
}

export const CharacterDetails = ({
  characterId,
  navigation,
}: CharacterDetailsProps) => {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(false);
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);
  const { data, isLoading } = useGetCharacterQuery(characterId);
  const episodeId = character?.episode[0].split('/').slice(-1)[0];
  const { data: episodeData } = useGetEpisodeQuery(episodeId ?? '');

  useEffect(() => {
    setLoading(isLoading);
    if (isLoading || !data) return;
    setCharacter(data);
    setEpisode(episodeData);
  }, [isLoading, data, episodeData]);

  if (loading || !character) return <Text>Loading...</Text>;

  navigation.setOptions({ title: character.name });
  console.log('char', character);

  return (
    <View style={tw`flex w-full h-full`}>
      <View style={tw`h-1/2`}>
        <Image
          style={tw`h-full w-full`}
          source={{
            uri: character?.image,
          }}
        />
      </View>
      <View
        style={tw`p-4 flex justify-between h-full leading-normal bg-neutral-700`}>
        <View style={tw`mb-8`}>
          <View style={tw`mb-2`}>
            <TextTitleComponent text={character.name} />
            <TextSmallComponent
              status={character.status}
              specie={character.species}
            />
          </View>
          <View style={tw`mb-2`}>
            <TextSubtitleComponent text="Last known location:" />
            <TextCustomComponent text={character.location.name} />
          </View>
          <View>
            <TextSubtitleComponent text="First seen in:" />
            {episode ? <TextCustomComponent text={episode.name} /> : null}
          </View>
        </View>
      </View>
    </View>
  );
};
