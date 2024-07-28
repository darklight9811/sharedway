/**
 * ### States
 *
 * Temporary solution to hack brazilian states into select
 *
 * @link https://brasilapi.com.br/api/ibge/uf/v1
 *
 * TODO: Remove as soon as possible
 */
const states = [
	{
		id: "RO",
		label: "Rondônia",
		regiao: { id: "N", label: "Norte" },
	},
	{
		id: "AC",
		label: "Acre",
		regiao: { id: "N", label: "Norte" },
	},
	{
		id: "AM",
		label: "Amazonas",
		regiao: { id: "N", label: "Norte" },
	},
	{
		id: "RR",
		label: "Roraima",
		regiao: { id: "N", label: "Norte" },
	},
	{
		id: "PA",
		label: "Pará",
		regiao: { id: "N", label: "Norte" },
	},
	{
		id: "AP",
		label: "Amapá",
		regiao: { id: "N", label: "Norte" },
	},
	{
		id: "TO",
		label: "Tocantins",
		regiao: { id: "N", label: "Norte" },
	},
	{
		id: "MA",
		label: "Maranhão",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "PI",
		label: "Piauí",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "CE",
		label: "Ceará",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "RN",
		label: "Rio Grande do Norte",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "PB",
		label: "Paraíba",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "PE",
		label: "Pernambuco",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "AL",
		label: "Alagoas",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "SE",
		label: "Sergipe",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "BA",
		label: "Bahia",
		regiao: { id: "NE", label: "Nordeste" },
	},
	{
		id: "MG",
		label: "Minas Gerais",
		regiao: { id: "SE", label: "Sudeste" },
	},
	{
		id: "ES",
		label: "Espírito Santo",
		regiao: { id: "SE", label: "Sudeste" },
	},
	{
		id: "RJ",
		label: "Rio de Janeiro",
		regiao: { id: "SE", label: "Sudeste" },
	},
	{
		id: "SP",
		label: "São Paulo",
		regiao: { id: "SE", label: "Sudeste" },
	},
	{
		id: "PR",
		label: "Paraná",
		regiao: { id: "S", label: "Sul" },
	},
	{
		id: "SC",
		label: "Santa Catarina",
		regiao: { id: "S", label: "Sul" },
	},
	{
		id: "RS",
		label: "Rio Grande do Sul",
		regiao: { id: "S", label: "Sul" },
	},
	{
		id: "MS",
		label: "Mato Grosso do Sul",
		regiao: { id: "CO", label: "Centro-Oeste" },
	},
	{
		id: "MT",
		label: "Mato Grosso",
		regiao: { id: "CO", label: "Centro-Oeste" },
	},
	{
		id: "GO",
		label: "Goiás",
		regiao: { id: "CO", label: "Centro-Oeste" },
	},
	{
		id: "DF",
		label: "Distrito Federal",
		regiao: { id: "CO", label: "Centro-Oeste" },
	},
];

export default states;
