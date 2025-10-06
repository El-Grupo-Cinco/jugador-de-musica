import React from 'react';
import { View } from 'react-native';
import SearchBar from '@/components/searchbar';
import { useQueryStore } from '@/store/store';
import { ThemedText } from "@/components/themed-text";

export default function SearchPage() {
    const query = useQueryStore((state) => state.query);
    const setQuery = useQueryStore((state) => state.setQuery);

    return (
        <View style={{ padding: 20 }}>
            <SearchBar query={query} setQuery={setQuery} />
            <ThemedText>Search page here</ThemedText>
        </View>
    );
}
