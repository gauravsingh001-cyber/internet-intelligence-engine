const assert = require('assert');
const fs = require('fs');
const Module = require('module');
const path = require('path');
const ts = require('typescript');

const root = path.join(__dirname, '..');
const moduleCache = {};

function loadTypeScriptModule(relativePath) {
  const filename = path.join(root, relativePath);

  if (moduleCache[filename]) {
    return moduleCache[filename].exports;
  }

  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const mod = new Module(filename, module);
  moduleCache[filename] = mod;
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  mod.require = (id) => {
    if (id === '@/lib/query') {
      return loadTypeScriptModule('lib/query.ts');
    }

    return require(id);
  };
  mod._compile(compiled, filename);

  return mod.exports;
}

const { transformSearchResults } = loadTypeScriptModule('lib/intelligence.ts');

function servicesResults(company, website, wikipediaSlug, linkedinSlug) {
  return [
    {
      title: `${company} company profile: IT services and consulting`,
      url: website,
      snippet: `${company} is an IT services, consulting, and digital transformation company serving enterprise clients with cloud, application modernization, managed services, and AI-enabled automation programs.`,
    },
    {
      title: `${company} - Wikipedia`,
      url: `https://en.wikipedia.org/wiki/${wikipediaSlug}`,
      snippet: `${company} is a multinational information technology services and consulting company. Its business model is enterprise technology services, outsourcing, systems integration, and digital transformation.`,
    },
    {
      title: `${company} LinkedIn company page`,
      url: `https://www.linkedin.com/company/${linkedinSlug}`,
      snippet: `${company} provides technology services, consulting, managed services, cloud migration, data services, and digital transformation for global businesses using modern AI tools where useful.`,
    },
    {
      title: `About ${company}`,
      url: `${website.replace(/\/$/, '')}/about`,
      snippet: `${company} helps enterprises modernize technology operations through IT services, consulting, application development, business process services, and digital transformation.`,
    },
  ];
}

const cases = [
  {
    company: 'Infosys',
    results: servicesResults('Infosys', 'https://www.infosys.com/', 'Infosys', 'infosys'),
    expectedIndustry: 'IT Services, Consulting and Digital Transformation',
  },
  {
    company: 'TCS',
    results: servicesResults('TCS', 'https://www.tcs.com/', 'Tata_Consultancy_Services', 'tata-consultancy-services'),
    expectedIndustry: 'IT Services and Enterprise Technology',
  },
  {
    company: 'Wipro',
    results: servicesResults('Wipro', 'https://www.wipro.com/', 'Wipro', 'wipro'),
    expectedIndustry: 'IT Services and Consulting',
  },
];

for (const testCase of cases) {
  const intelligence = transformSearchResults(testCase.results, testCase.company);

  assert.notStrictEqual(
    intelligence.industry,
    'Artificial Intelligence',
    `${testCase.company} must not be classified as Artificial Intelligence`
  );
  assert.strictEqual(intelligence.industry, testCase.expectedIndustry);
  assert.strictEqual(intelligence.category, 'Technology Services');
  assert.ok(intelligence.confidence >= 40, `${testCase.company} should pass company validation`);
}

console.log('Classification tests passed for Infosys, TCS, and Wipro.');
