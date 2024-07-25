import { Link } from "@/lib/navigation";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/ds/ui/accordion";
import { buttonVariants } from "@repo/ds/ui/button";
import { Code, Handshake, Users } from "lucide-react";
import Image from "next/image";

export default function Page() {
	return (
		<>
			{/**
			 * ### MARK: Hero
			 */}

			<div className="flex flex-col justify-center min-h-[1000px] items-center relative pb-[20vh] px-2 mb-[450px]">
				<Image
					src="/images/arts/splash_01.svg"
					alt=""
					fill
					className="left-0 top-0 mt-[-56px] absolute z-[-1]"
					priority
				/>

				<h1 className="text-7xl font-bold max-w-screen-xl text-center text-white animate-top-in mb-8">
					Reencontre vidas com nossa plataforma inteligente
				</h1>
				<h2 className="text-2xl font-light text-center text-[#262a41] opacity-0 animation-delay-200 animate-top-in">
					A plataforma centralizada para localizar pessoas e animais
					desaparecidos com eficiência e colaboração.
				</h2>
				<Image
					src="/images/arts/line_01.svg"
					alt=""
					fill
					className="left-0 !top-[25%] absolute z-[-1]"
					priority
				/>

				<Link
					href="/entities"
					className={buttonVariants({
						className: "mt-8 !text-2xl !py-8",
						variant: "secondary",
						size: "lg",
					})}
				>
					Comece sua busca agora
				</Link>

				<Image
					src="/images/screenshots/dashboard.png"
					alt=""
					width={1100}
					height={679}
					className="z-[-1] absolute top-[65%]"
					priority
				/>
			</div>

			{/**
			 * ### MARK: How
			 */}

			<div className="container mx-auto flex gap-10">
				<div className="w-full sm:w-1/2">
					<Image
						src="/images/arts/people_01.svg"
						alt=""
						width={600}
						height={479}
					/>
				</div>
				<div className="text-slate-900 font-normal text-xl w-full sm:w-1/2 flex flex-col grow justify-center">
					<h1 className="text-5xl font-extrabold mb-8">Como funciona?</h1>

					<p>
						Nossa plataforma foi projetada para tornar o processo de encontrar
						pessoas e animais desaparecidos o mais eficiente possível.
					</p>

					<ol className="list-decimal list-inside">
						<li>Relatar Desaparecimento</li>
						<li>Usar Filtros de Busca</li>
						<li>Contribuir com Informações</li>
					</ol>
				</div>
			</div>

			{/**
			 * ### MARK: Mobile
			 */}

			<div className="container mx-auto flex gap-10 mt-[172px]">
				<div className="text-slate-900 font-normal text-xl w-full sm:w-1/2 flex flex-col grow justify-center">
					<h1 className="text-5xl font-extrabold mb-8">Acompanhe os locais</h1>

					<p>
						Acompanhe as últimas localizações e movimentações reportadas por
						nossa comunidade. Sua colaboração é essencial para reencontrar quem
						está desaparecido.
					</p>

					<small className="text-[#1977f3] text-sm font-medium tracking-wide mt-8">
						Em breve
					</small>

					<div className="flex mt-2 gap-4">
						<Image
							src="/images/screenshots/app_store.png"
							alt=""
							width={120}
							height={40}
						/>
						<Image
							src="/images/screenshots/play_store.png"
							alt=""
							width={120}
							height={40}
							className="opacity-50"
						/>
					</div>
				</div>
				<div className="w-full sm:w-1/2">
					<Image
						src="/images/arts/phone_01.svg"
						alt=""
						width={600}
						height={622}
					/>
				</div>
			</div>

			{/**
			 * ### MARK: Action
			 */}

			<div className="bg-[#62b0f4] my-20">
				<div className="container mx-auto flex flex-col gap-10 py-20 items-center">
					<h1 className="text-white text-5xl font-extrabold">
						Ajude a encontrar quem está desaparecido
					</h1>

					<p className="text-2xl font-light text-black">
						Estamos constantemente formando parcerias com instituições e
						organizações para fortalecer nossa rede de apoio.
					</p>

					<Link
						href="/sign-up"
						className={buttonVariants({
							variant: "secondary",
							className:
								"!text-2xl font-bold leading-normal tracking-wide !px-6 !py-6",
						})}
					>
						Junte-se a nós
					</Link>
				</div>
			</div>

			{/**
			 * ### MARK: Features
			 */}

			<div className="container mx-auto my-[10vh] text-slate-900">
				<h1 className="text-6xl font-extrabold text-center mb-8">
					Conecte-se para reencontrar
				</h1>

				<p className="text-xl font-normal text-center">
					Somos uma plataforma de código aberto (OSS) dedicada a conectar
					pessoas e animais desaparecidos com seus entes queridos. Nossa missão
					é centralizar e distribuir informações de forma eficiente e acessível.
				</p>

				<div className="mx-16 rounded-3xl bg-gradient-to-l from-[#6FFFE9] to-[#62B0F4] my-16 flex justify-center items-center py-12">
					<Image
						src="/images/screenshots/search.png"
						alt=""
						width={1100}
						height={735}
					/>
				</div>

				<div className="flex flex-wrap justify-evenly my-8 gap-4">
					<div className="flex flex-col items-center max-w-xs">
						<Users size="64" />

						<h3 className="font-semibold text-xl">Comunidade</h3>

						<p className="text-justify">
							Nós estamos aqui graças àqueles que nos ajudam. A comunidade é a
							nossa força motriz e, por meio dela, conseguimos ajudar o próximo
							sempre que possível. Melhoramos a cada dia com a sua colaboração.
						</p>
					</div>

					<div className="flex flex-col items-center max-w-xs">
						<Code size="64" />

						<h3 className="font-semibold text-xl">Código aberto</h3>

						<p className="text-justify">
							Nosso código está inteiramente disponível e aberto para
							alterações. Faça parte e ajude a construir um mundo melhor através
							do nosso repositório Git, contribuindo com melhorias e inovações.
						</p>
					</div>

					<div className="flex flex-col items-center max-w-xs">
						<Handshake size="64" />

						<h3 className="font-semibold text-xl">Parceiros</h3>

						<p className="text-justify">
							Nossos parceiros nos permitem ir mais longe. Graças a essas
							parcerias, conseguimos distribuir nosso código de forma ampla,
							alcançando todos que precisam de nossa ajuda. Juntos, fazemos a
							diferença.
						</p>
					</div>
				</div>
			</div>

			{/**
			 * ### MARK: Report
			 */}

			<div className="bg-[#62b0f4] text-slate-900 mb-28">
				<div className="mx-auto container flex my-[10vh] relative px-4">
					<div className="w-full md:w-1/2 grow flex flex-col justify-center">
						<p className="text-2xl font-normal">
							"Estava desesperada quando meu cachorro Max desapareceu. Graças à
							plataforma Sharedway, consegui encontrá-lo em poucos dias. A
							ferramenta é intuitiva e eficaz. Agradeço a todos que ajudaram.
							Tenho meu melhor amigo de volta!"
						</p>

						<p className="text-2xl font-normal mt-4">Ana Souza,</p>
						<p className="text-2xl font-bold">mãe do Max</p>
					</div>

					<div className="w-full md:w-1/2 my-[-150px]">
						<Image src="/images/arts/dog.png" alt="" width={600} height={415} />
					</div>
				</div>
			</div>

			{/**
			 * ### MARK: FAQ
			 */}

			<div className="mb-32">
				<h1 className="text-slate-900 text-6xl font-extrabold text-center">
					Perguntas frequentes
				</h1>

				<Accordion
					type="single"
					collapsible
					className="container mx-auto px-8 sm:px-20 !text-2xl font-normal text-slate-900 mt-16"
				>
					<AccordionItem value="1">
						<AccordionTrigger className="!py-8">
							Como posso relatar um desaparecimento?
						</AccordionTrigger>
						<AccordionContent className="!text-2xl !py-8">
							Para relatar um desaparecimento, clique no botão "Relatar
							Desaparecimento" na parte superior da página. Preencha o
							formulário com as informações necessárias e envie. Nossa equipe
							revisará e publicará o caso em nossa plataforma.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="2">
						<AccordionTrigger className="!py-8">
							Como utilizo os filtros de busca?
						</AccordionTrigger>
						<AccordionContent className="!text-2xl !py-8">
							Na página inicial, utilize a ferramenta de busca para filtrar por
							localização, tipo (pessoa ou animal) e outras características
							específicas. Isso ajudará a refinar sua busca e encontrar
							informações mais relevantes.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="3">
						<AccordionTrigger className="!py-8">
							Como posso contribuir com informações?
						</AccordionTrigger>
						<AccordionContent className="!text-2xl !py-8">
							Você pode contribuir com informações clicando em um caso
							específico e adicionando um comentário com detalhes relevantes que
							possam ajudar na localização da pessoa ou animal desaparecido.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="4">
						<AccordionTrigger className="!py-8">
							Como funciona o sistema de parcerias?
						</AccordionTrigger>
						<AccordionContent className="!text-2xl !py-8">
							Nossos parceiros incluem instituições e organizações que colaboram
							conosco para fortalecer nossa rede de apoio. Eles ajudam na
							divulgação de casos, fornecem recursos e compartilham informações
							que são essenciais para nossa missão.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="5">
						<AccordionTrigger className="!py-8">
							Como posso me voluntariar para ajudar?
						</AccordionTrigger>
						<AccordionContent className="!text-2xl !py-8">
							Para se voluntariar, entre em contato conosco através da seção
							"Contato" no menu. Estamos sempre à procura de pessoas dedicadas e
							dispostas a contribuir para nossa causa.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

			{/**
			 * ### MARK: Last action
			 */}

			<div className="bg-gradient-to-l from-[#6FFFE9] to-[#62B0F4] my-20">
				<div className="container mx-auto flex flex-col gap-10 py-32 items-center">
					<h1 className="text-white text-5xl font-extrabold text-center">
						Ajude a trazer esperança para quem busca seus entes queridos
					</h1>

					<p className="text-2xl font-light text-black">
						Formamos parcerias estratégicas com instituições para fortalecer
						nossa rede de apoio.
					</p>

					<Link
						href="/sign-up"
						className={buttonVariants({
							variant: "secondary",
							className:
								"!text-2xl font-bold leading-normal tracking-wide !px-6 !py-6",
						})}
					>
						Faça parte da solução
					</Link>
				</div>
			</div>
		</>
	);
}
