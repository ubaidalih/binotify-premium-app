import {
    extendTheme,
    theme as base,
    withDefaultColorScheme,
    withDefaultVariant,
} from '@chakra-ui/react';

const inputDefaultStyles = {
    variants: {
        filled: {
            field: {
                borderRadius: 'none',
                bgColor: 'brand.50',
                color: 'brand.200',

                _focus: {
                    bgColor: 'brand.400',
                    borderColor: 'brand.400',
                },
                _hover: {
                    bgColor: 'brand.50',
                },
                _placeholder: {
                    opacity: 0.4,
                    color: 'brand.500',
                },
            },
        },
    },
};

const buttonDefaultStyles = {
    variants: {
        solid: {
            bgColor: 'brand.200',
            borderColor: 'none',
            color: 'brand.100',
            size: 'md',
            borderRadius: '25px',
            _hover: {
                size: 'lg',
                bgColor: 'brand.300',
                color: 'brand.200',
            },
        },
    },
};

const textDefaultStyles = {
    color: 'brand.500',
};

const theme = extendTheme(
    {
        colors: {
            brand: {
                50: '#333333',
                100: 'black',
                200: 'white',
                300: '#1DB954',
                400: '#404040',
                500: '#b0b8bf',
            },
        },
        fonts: {
            heading: `Montserrat,${base.fonts?.heading}`,
            body: `Inter, ${base.fonts?.body}`,
        },
        components: {
            Input: { ...inputDefaultStyles },
            Button: { ...buttonDefaultStyles },
        },
    },
    withDefaultColorScheme({
        colorScheme: 'brand',
        components: ['Button', 'Text'],
    }),
    withDefaultVariant({
        variant: 'filled',
        components: ['Input', 'Table'],
    })
);

export default theme;
