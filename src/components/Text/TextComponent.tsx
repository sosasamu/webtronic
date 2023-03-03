import React from 'react';
import { Text } from 'react-native';
import tw from 'twrnc';

interface TextsCustomComponentsProps {
  text: string;
}

interface TextSmallComponentProps {
  status: string;
  specie: string;
}

export const TextTitleComponent = ({ text }: TextsCustomComponentsProps) => (
  <Text style={tw`text-gray-900 font-bold text-lg text-white`}>{text}</Text>
);

export const TextSubtitleComponent = ({ text }: TextsCustomComponentsProps) => (
  <Text style={tw`text-slate-400 font-xs`}>{text}</Text>
);

export const TextCustomComponent = ({ text }: TextsCustomComponentsProps) => (
  <Text style={tw`text-sm text-white`}>{text}</Text>
);

export const TextSmallComponent = ({
  status,
  specie,
}: TextSmallComponentProps) => (
  <Text style={tw`text-xs text-white`}>
    {status} - {specie}
  </Text>
);
