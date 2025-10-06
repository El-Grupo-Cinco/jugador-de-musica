import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type SearchBarProps = {
    query: string;
    setQuery: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search sounds..."
                value={query}
                onChangeText={setQuery}
                placeholderTextColor="#aaa"
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 15,
    },
    input: {
        fontSize: 16,
        color: '#333',
    },
});
