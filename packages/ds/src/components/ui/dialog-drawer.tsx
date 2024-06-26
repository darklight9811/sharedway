"use client";

import { createContext, createElement, useContext, useState } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Button } from "./button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./drawer";

/**
 * ### MARK: Interfaces
 */

interface Props {
	children: React.ReactNode;
	title?: React.ReactNode;
	description?: React.ReactNode;
}

/**
 * ### MARK: Context
 */
const context = createContext({ desktop: true, setOpen(state: boolean) {} });

/**
 * ### MARK: Drawer Dialog
 *
 */

export function DialogDrawer(props: Props): React.ReactNode {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return createElement(
		isDesktop ? Dialog : Drawer,
		{
			open,
			onOpenChange: setOpen,
		},
		<context.Provider value={{ desktop: isDesktop, setOpen }}>
			{props.children}
		</context.Provider>,
	);
}

/**
 * ### MARK: Trigger
 *
 */
export function DialogDrawerTrigger(props: {
	children: React.ReactNode;
	asChild?: boolean;
}) {
	const ctx = useContext(context);

	if (ctx.desktop) {
		return (
			<DialogTrigger asChild={props.asChild}>{props.children}</DialogTrigger>
		);
	}

	return (
		<DrawerTrigger asChild={props.asChild}>{props.children}</DrawerTrigger>
	);
}

/**
 * ### MARK: Content
 */
export function DialogDrawerContent(props: {
	children: React.ReactNode;
	title?: React.ReactNode;
	description?: React.ReactNode;
	cancel?: React.ReactNode;
}) {
	const ctx = useContext(context);

	if (ctx.desktop) {
		return (
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					{props.title && <DialogTitle>{props.title}</DialogTitle>}
					{props.description && (
						<DialogDescription>{props.description}</DialogDescription>
					)}
				</DialogHeader>

				{props.children}
			</DialogContent>
		);
	}

	return (
		<DrawerContent>
			<DrawerHeader className="text-left">
				{props.title && <DrawerTitle>{props.title}</DrawerTitle>}
				{props.description && (
					<DrawerDescription>{props.description}</DrawerDescription>
				)}
			</DrawerHeader>

			{props.children}

			{props.cancel && (
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">{props.cancel}</Button>
					</DrawerClose>
				</DrawerFooter>
			)}
		</DrawerContent>
	);
}
