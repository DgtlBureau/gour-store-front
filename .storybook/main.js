module.exports = {
    "stories": [
        "../components/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        'storybook-css-modules-preset',
        '@storybook/preset-scss',
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "webpack5"
    }
}