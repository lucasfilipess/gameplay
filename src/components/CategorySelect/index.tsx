import React from 'react';
import { ScrollView } from 'react-native';
import { Category } from '../Category';
import { categories } from '../../utils/categories';
import { styles } from './styles';

type CategorySelect = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
};

export function CategorySelect({
  categorySelected,
  setCategory,
  hasCheckBox = false,
}: CategorySelect) {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map(({ id, title, icon }) => (
        <Category
          key={id}
          title={title}
          icon={icon}
          checked={id === categorySelected}
          onPress={() => setCategory(id)}
          hasCheckBox={hasCheckBox}
        />
      ))}
    </ScrollView>
  );
}
