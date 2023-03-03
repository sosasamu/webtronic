import React, { useEffect, useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import tw from 'twrnc';
import { useGetEpisodeQuery } from '../../services/episodes';
import { Character, Episode } from '../../services/types';
import {
  TextSmallComponent,
  TextCustomComponent,
  TextSubtitleComponent,
  TextTitleComponent,
} from '../Text/TextComponent';

interface HorizontalCardProps {
  character: Character;
  navigation: any;
}

export const HorizontalCard = (props: HorizontalCardProps) => {
  const { character, navigation } = props;
  const [episode, setEpisode] = useState<Episode | null>(null);
  const episodeId = character.episode[0].split('/').slice(-1)[0];
  const { data } = useGetEpisodeQuery(episodeId);

  useEffect(() => {
    if (!data) return;
    setEpisode(data);
  }, [data]);

  const handleNavigation = () =>
    navigation.navigate('Character', {
      characterId: character.id,
    });

  return (
    <Pressable
      style={tw`flex flex-row w-full h-42 mb-2 rounded`}
      onPress={() => handleNavigation()}>
      <View style={tw`w-1/3`}>
        <Image
          style={tw`h-full`}
          source={{
            uri: character.image,
          }}
        />
      </View>
      <View
        style={tw`border-l border-gray-400 p-4 w-2/3 flex justify-between leading-normal bg-neutral-700`}>
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
    </Pressable>
  );
};
