--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    urls text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" bigint DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '81bceed0-ce20-4566-afcd-8708d0ddfe9b', '2023-08-06 14:37:45.907838', 1);
INSERT INTO public.sessions VALUES (2, 'cbd87530-0698-4db1-b91f-57f7ca732c54', '2023-08-06 14:46:11.148699', 1);
INSERT INTO public.sessions VALUES (3, '4deb429a-261f-40b4-90fa-a9fab3fcbba6', '2023-08-06 14:47:20.996899', 1);
INSERT INTO public.sessions VALUES (4, '2ed9f793-65c4-4506-9f95-955b0007d6ac', '2023-08-06 20:35:59.171368', 2);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://www.driven.com.br', '_3CYdxN-', 0, '2023-08-06 16:32:35.901973', 1);
INSERT INTO public.urls VALUES (2, 'https://www.driven.com.br', 'AJEUc_a3', 0, '2023-08-06 16:34:00.423186', 1);
INSERT INTO public.urls VALUES (3, 'https://www.driven.com.br', 'lvvnXaN5', 0, '2023-08-06 16:34:37.535671', 1);
INSERT INTO public.urls VALUES (4, 'https://www.driven.com.br', 'XUH2lgeQ', 0, '2023-08-06 16:36:05.198742', 1);
INSERT INTO public.urls VALUES (5, 'https://www.driven.com.br', 'wqKaHDWL', 0, '2023-08-06 16:37:23.326791', 1);
INSERT INTO public.urls VALUES (6, 'https://www.driven.com.br', '9tugh0TF', 0, '2023-08-06 18:03:27.04028', 1);
INSERT INTO public.urls VALUES (7, 'https://www.driven.com.br', '8V0IHKVE', 0, '2023-08-06 18:03:58.357225', 1);
INSERT INTO public.urls VALUES (8, 'https://www.driven.com.br', '0SJdr9px', 0, '2023-08-06 18:04:10.731563', 1);
INSERT INTO public.urls VALUES (9, 'https://www.driven.com.br', 'JtMYxSJn', 0, '2023-08-06 18:04:49.636785', 1);
INSERT INTO public.urls VALUES (10, 'https://www.driven.com.br', 'GdSBWUkK', 0, '2023-08-06 18:04:51.961542', 1);
INSERT INTO public.urls VALUES (13, 'https://www.driven.com.br', 'D-69bRbD', 0, '2023-08-06 18:07:07.504797', 1);
INSERT INTO public.urls VALUES (14, 'https://www.driven.com.br', '-y10Hp8D', 0, '2023-08-06 18:07:30.869857', 1);
INSERT INTO public.urls VALUES (15, 'https://www.driven.com.br', 'pbSWnoZr', 0, '2023-08-06 18:07:33.794956', 1);
INSERT INTO public.urls VALUES (16, 'https://www.driven.com.br', 'Qm5a6kLQ', 0, '2023-08-06 18:07:48.968434', 1);
INSERT INTO public.urls VALUES (17, 'https://www.drivenss.com.br', 'cMiRX2l-', 0, '2023-08-06 18:08:24.163455', 1);
INSERT INTO public.urls VALUES (18, 'https://www.drivenss.com.br', 'D1mJklSG', 0, '2023-08-06 18:08:48.110181', 1);
INSERT INTO public.urls VALUES (19, 'https://www.drivenss.com.br', 'ndjPf37s', 0, '2023-08-06 18:09:22.3514', 1);
INSERT INTO public.urls VALUES (20, 'https://www.drivenss.com.br', 'XDHxpoS7', 0, '2023-08-06 18:10:00.913237', 1);
INSERT INTO public.urls VALUES (21, 'https://www.drivenss.com.br', 'j6XexQN0', 0, '2023-08-06 18:11:42.231498', 1);
INSERT INTO public.urls VALUES (22, 'https://www.drivenss.com.br', 'bVLIrieF', 0, '2023-08-06 18:12:01.472404', 1);
INSERT INTO public.urls VALUES (23, 'https://www.drivenss.com.br', 'CjlTzYPS', 0, '2023-08-06 18:16:57.370579', 1);
INSERT INTO public.urls VALUES (24, 'https://www.drivenss.com.br', 'zsMmjB4N', 0, '2023-08-06 18:18:42.874812', 1);
INSERT INTO public.urls VALUES (25, 'https://www.drivenss.com.br', 'kjL83QPV', 0, '2023-08-06 18:19:56.922731', 1);
INSERT INTO public.urls VALUES (26, 'https://www.drivenss', 'fWbDSMkp', 0, '2023-08-06 18:23:52.206152', 1);
INSERT INTO public.urls VALUES (27, 'http://www.oi.com', 'tEpz9bY2', 0, '2023-08-06 18:24:32.157788', 1);
INSERT INTO public.urls VALUES (28, 'http://oi.com', 'zduUQyFi', 0, '2023-08-06 18:24:41.424822', 1);
INSERT INTO public.urls VALUES (11, 'https://www.driven.com.br', 'wTb9ZYVz', 3, '2023-08-06 18:05:32.32322', 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'milena', 'email@email.com', '$2b$10$C6I1IDi0fGp7OgPQ4g4M6OUDH4YaVkCyQ6IMWgtdGriTMLPp1a1uy', '2023-08-06 13:27:44.222157');
INSERT INTO public.users VALUES (2, 'milena', 'emailo@email.com', '$2b$10$HpE5unL4jS4Cgdk2uf/xBu4kJaGkSWxl9bROwv5FwoZBsQ7TDn/0S', '2023-08-06 13:31:23.910265');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

