import React from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';

type SearchBarProps = {
    query: string;
    setQuery: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
    const router = useRouter(); // For navigation

    const handleSubmit = () => {
        Keyboard.dismiss();
        if (query.trim() !== '') {
            router.push('/search'); // Go to the Search page
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search sounds..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSubmit} // Triggers on Enter
                returnKeyType="search"
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
