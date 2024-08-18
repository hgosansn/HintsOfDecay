// Environment variables
const env = {
    name: 'HintsOfDecay',
    domain: 'hgosansn.github.io/',
    proto: 'https://'
};

module.exports = {
    ...env,
    url: `${env.proto}${env.domain}`,
    domain: `${env.domain}${env.name}`,
    publicPath: `/${env.name}/`,
};
