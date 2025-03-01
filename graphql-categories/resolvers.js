const realms = require('./data');

const resolvers = {
  realms: () => realms,
  domains: ({ realmSlug }) => {
    const realm = realms.find((r) => r.slug === realmSlug);
    return realm ? realm.domains : [];
  },
  niches: ({ domainSlug }) => {
    for (const realm of realms) {
      const domain = realm.domains.find((d) => d.slug === domainSlug);
      if (domain) return domain.niches;
    }
    return [];
  },
};

module.exports = resolvers;