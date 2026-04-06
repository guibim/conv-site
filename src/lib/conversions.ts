export type FilterType = "all" | "csv" | "txt" | "json" | "xml" | "html";
export type ConversionGroupKey = Exclude<FilterType, "all">;

export interface ConversionDefinition {
  path: string;
  fromFormat: string;
  toFormat: string;
  acceptedExtension: string;
  labelKey: string;
  descKey: string;
  pageTitleKey: string;
  group: ConversionGroupKey;
}

export interface ConversionGroupDefinition {
  key: ConversionGroupKey;
  titleKey: string;
}

export const conversionFilters: Array<{ key: FilterType; labelKey: string }> = [
  { key: "all", labelKey: "index.filter.all" },
  { key: "csv", labelKey: "index.filter.csv" },
  { key: "txt", labelKey: "index.filter.txt" },
  { key: "json", labelKey: "index.filter.json" },
  { key: "xml", labelKey: "index.filter.xml" },
  { key: "html", labelKey: "index.filter.html" },
];

export const conversionGroups: ConversionGroupDefinition[] = [
  { key: "csv", titleKey: "group.csv" },
  { key: "txt", titleKey: "group.txt" },
  { key: "json", titleKey: "group.json" },
  { key: "xml", titleKey: "group.xml" },
  { key: "html", titleKey: "group.html" },
];

export const conversions: ConversionDefinition[] = [
  {
    path: "/csv-to-json",
    fromFormat: "csv",
    toFormat: "json",
    acceptedExtension: ".csv",
    labelKey: "conv.csv_to_json",
    descKey: "desc.csv_json",
    pageTitleKey: "page.csv_to_json",
    group: "csv",
  },
  {
    path: "/csv-to-xml",
    fromFormat: "csv",
    toFormat: "xml",
    acceptedExtension: ".csv",
    labelKey: "conv.csv_to_xml",
    descKey: "desc.csv_xml",
    pageTitleKey: "page.csv_to_xml",
    group: "csv",
  },
  {
    path: "/csv-to-html",
    fromFormat: "csv",
    toFormat: "html",
    acceptedExtension: ".csv",
    labelKey: "conv.csv_to_html",
    descKey: "desc.csv_html",
    pageTitleKey: "page.csv_to_html",
    group: "csv",
  },
  {
    path: "/csv-to-txt",
    fromFormat: "csv",
    toFormat: "txt",
    acceptedExtension: ".csv",
    labelKey: "conv.csv_to_txt",
    descKey: "desc.csv_txt",
    pageTitleKey: "page.csv_to_txt",
    group: "csv",
  },
  {
    path: "/txt-to-csv",
    fromFormat: "txt",
    toFormat: "csv",
    acceptedExtension: ".txt",
    labelKey: "conv.txt_to_csv",
    descKey: "desc.txt_csv",
    pageTitleKey: "page.txt_to_csv",
    group: "txt",
  },
  {
    path: "/txt-to-json",
    fromFormat: "txt",
    toFormat: "json",
    acceptedExtension: ".txt",
    labelKey: "conv.txt_to_json",
    descKey: "desc.txt_json",
    pageTitleKey: "page.txt_to_json",
    group: "txt",
  },
  {
    path: "/txt-to-xml",
    fromFormat: "txt",
    toFormat: "xml",
    acceptedExtension: ".txt",
    labelKey: "conv.txt_to_xml",
    descKey: "desc.txt_xml",
    pageTitleKey: "page.txt_to_xml",
    group: "txt",
  },
  {
    path: "/json-to-csv",
    fromFormat: "json",
    toFormat: "csv",
    acceptedExtension: ".json",
    labelKey: "conv.json_to_csv",
    descKey: "desc.json_csv",
    pageTitleKey: "page.json_to_csv",
    group: "json",
  },
  {
    path: "/json-to-txt",
    fromFormat: "json",
    toFormat: "txt",
    acceptedExtension: ".json",
    labelKey: "conv.json_to_txt",
    descKey: "desc.json_txt",
    pageTitleKey: "page.json_to_txt",
    group: "json",
  },
  {
    path: "/json-to-xml",
    fromFormat: "json",
    toFormat: "xml",
    acceptedExtension: ".json",
    labelKey: "conv.json_to_xml",
    descKey: "desc.json_xml",
    pageTitleKey: "page.json_to_xml",
    group: "json",
  },
  {
    path: "/xml-to-csv",
    fromFormat: "xml",
    toFormat: "csv",
    acceptedExtension: ".xml",
    labelKey: "conv.xml_to_csv",
    descKey: "desc.xml_csv",
    pageTitleKey: "page.xml_to_csv",
    group: "xml",
  },
  {
    path: "/xml-to-json",
    fromFormat: "xml",
    toFormat: "json",
    acceptedExtension: ".xml",
    labelKey: "conv.xml_to_json",
    descKey: "desc.xml_json",
    pageTitleKey: "page.xml_to_json",
    group: "xml",
  },
  {
    path: "/html-to-txt",
    fromFormat: "html",
    toFormat: "txt",
    acceptedExtension: ".html",
    labelKey: "conv.html_to_txt",
    descKey: "desc.html_txt",
    pageTitleKey: "page.html_to_txt",
    group: "html",
  },
];
