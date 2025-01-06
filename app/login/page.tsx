"use client";

import React from "react";
import {Button, Input, Checkbox, Link, Form, Divider} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import { AcmeIcon } from "./acme"; 

export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit");
    };


  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <AcmeIcon size={60} />
          <p className="text-xl font-medium">Seja Bem-vindo de volta </p>
          <p className="text-small text-default-500">Você precisa logar para continuar!</p>
        </div>
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email"
            name="email"
            placeholder="Digite o seu email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Link className="text-default-500" href="#" size="sm">
              Esqueceu sua senha?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}