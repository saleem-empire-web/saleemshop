--
-- PostgreSQL database dump
--

\restrict mm3G6Iv8WmMe8D7ShDcg8a9y08cbVRiQ2Zh1gD9oQfgmKq75mv596U8yeE1nQLZ

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

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
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    name_ar text NOT NULL,
    description text NOT NULL,
    description_ar text NOT NULL,
    image_url text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    name_ar text NOT NULL,
    description text NOT NULL,
    description_ar text NOT NULL,
    price numeric(10,2) NOT NULL,
    compare_at_price numeric(10,2),
    image_url text NOT NULL,
    category_id integer NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    in_stock boolean DEFAULT true NOT NULL,
    rating numeric(3,2) DEFAULT 4.00 NOT NULL,
    review_count integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, name_ar, description, description_ar, image_url, created_at) FROM stdin;
1	Glass Pipes	غلايين زجاجية	Handcrafted glass pipes and bubblers for the discerning collector	غلايين زجاجية يدوية الصنع للمقتنين المميزين	/images/cat-glass-pipes.png	2026-04-12 16:56:06.651181+00
2	Vaporizers	أجهزة التبخير	Premium dry herb and concentrate vaporizers	أجهزة تبخير فاخرة للأعشاب والمركزات	/images/cat-vaporizers.png	2026-04-12 16:56:06.651181+00
3	Rolling Papers	ورق لف	Organic and flavored rolling papers and wraps	ورق لف عضوي ومنكّه	/images/cat-rolling-papers.png	2026-04-12 16:56:06.651181+00
4	Accessories	إكسسوارات	Grinders, lighters, trays, and more	مطاحن وولاعات وصوانٍ والمزيد	/images/cat-accessories.png	2026-04-12 16:56:06.651181+00
5	Hookahs	شيشة	Traditional and modern hookah sets with premium tobacco	مجموعات شيشة تقليدية وعصرية مع تبغ فاخر	/images/cat-hookahs.png	2026-04-12 16:56:06.651181+00
6	Soft Drinks \t	مشروبات غازية \t	Refreshing soft drinks perfect for any time of the day.	مشروبات باردة ومنعشة لجميع الأوقات\n	/images/uploads/upload-1776222918007-918241.jpeg	2026-04-15 03:15:20.265279+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, name_ar, description, description_ar, price, compare_at_price, image_url, category_id, featured, in_stock, rating, review_count, created_at, quantity) FROM stdin;
5	Pax Plus Portable	باكس بلاس المحمول	Sleek portable vaporizer with precision temperature control	جهاز تبخير محمول أنيق مع تحكم دقيق في الحرارة	59.99	\N	/images/prod-pax-plus.png	2	t	t	4.70	445	2026-04-12 16:56:43.876124+00	0
3	Nebula Spoon Pipe	غليون سديم	Galaxy-themed spoon pipe with fumed glass accents	غليون بتصميم مجري مع لمسات زجاجية مدخنة	45.99	\N	/images/prod-nebula-pipe.png	1	f	t	4.50	203	2026-04-12 16:56:43.876124+00	0
17	New LED Display Cabinets in Stock! Perfect for vape & tobacco shops – Make your products shine! 📲 DM for wholesale price.	خزائن عرض LED جديدة متوفرة في المخزون الآن!	New LED Display Cabinets in Stock!\n\nPerfect for vape & tobacco shops – Make your products shine!\n\nDM for wholesale price.\n\nCustom Display Cabinets Available!\n\nDo you want your own custom design with logo, colors, or special size?\n\nWe can make it for you!\n\nBut please note: Custom orders require advance notice to prepare and manufacture.\n\nJUL 17\n\nLet us know ahead of time so we can deliver on time.\n\nWholesale & retail Message us today to discuss your custom design	خزائن عرض جديدة مزودة بإضاءة LED متوفرة الآن في المخزون!\n\nمثالية لمتاجر منتجات الـ "فيب" والتبغ – اجعل منتجاتك تتألق!\n	799.99	999.99	/images/uploads/upload-1776216578508-721026.jpeg	1	f	f	4.00	0	2026-04-15 01:30:17.983114+00	2
6	DynaVap M Plus	داينافاب إم بلاس	Manual thermal extraction device, no batteries needed	جهاز استخلاص حراري يدوي لا يحتاج بطاريات	75.00	85.00	/images/prod-dynavap.png	2	f	t	4.60	189	2026-04-12 16:56:43.876124+00	0
7	RAW Classic King Size	راو كلاسيك كينغ سايز	Unrefined natural rolling papers, 32 leaves per pack	ورق لف طبيعي غير مكرر 32 ورقة في العلبة	3.99	\N	/images/prod-raw-papers.png	3	f	t	4.80	1205	2026-04-12 16:56:43.876124+00	0
8	Elements Ultra Thin Rice	إليمنتس رقيق جداً	Ultra-thin rice paper that burns with virtually zero ash	ورق أرز رقيق جداً يحترق مع صفر رماد تقريباً	4.49	\N	/images/prod-elements-papers.png	3	f	t	4.70	876	2026-04-12 16:56:43.876124+00	0
9	Blazy Susan Pink Papers	بلازي سوزان الوردية	Iconic pink rolling papers made from plant-based dye	ورق لف وردي مصنوع من صبغة نباتية	5.99	\N	/images/prod-blazy-papers.png	3	t	t	4.60	654	2026-04-12 16:56:43.876124+00	0
11	Clipper Eco Lighter 4-Pack	ولاعات كليبر إيكو 4 قطع	Refillable butane lighters with unique designs	ولاعات بوتان قابلة لإعادة التعبئة بتصاميم فريدة	9.99	\N	/images/prod-clipper-lighters.png	4	f	t	4.40	312	2026-04-12 16:56:43.876124+00	0
12	RAW Rolling Tray Large	صينية راو كبيرة	Official RAW branded rolling tray, large size	صينية لف رسمية من راو بالحجم الكبير	24.99	\N	/images/prod-rolling-tray.png	4	f	t	4.70	445	2026-04-12 16:56:43.876124+00	0
13	Khalil Mamoon Trimetal	خليل مأمون تراي ميتال	Handcrafted Egyptian hookah with brass and copper details	شيشة مصرية يدوية الصنع بتفاصيل نحاسية	189.99	229.99	/images/prod-khalil-mamoon.png	5	t	t	4.80	156	2026-04-12 16:56:43.876124+00	0
14	Cloud One Hookah	كلاود ون شيشة	Modern glass and stainless steel hookah with LED base	شيشة زجاجية عصرية من الستانلس ستيل مع قاعدة LED	299.99	\N	/images/prod-cloud-hookah.png	5	t	t	4.70	98	2026-04-12 16:56:43.876124+00	0
15	Al Fakher Shisha Tobacco	تبغ الفاخر للشيشة	Premium double apple flavor shisha tobacco, 250g	تبغ شيشة بنكهة التفاحتين الفاخرة 250 غرام	14.99	\N	/images/prod-shisha-tobacco.png	5	f	t	4.60	789	2026-04-12 16:56:43.876124+00	0
16	Saleam shisha	سليم شيشه	Exclusive 	منتج حصري 	46.99	60.99	/images/uploads/upload-1776173894585-189581.jpg	5	f	t	4.00	0	2026-04-14 13:38:22.003405+00	5
4	Volcano Hybrid Vaporizer	مبخرة فولكينو الهجينة	The gold standard in desktop vaporization with app control	المعيار الذهبي في التبخير المكتبي مع التحكم عبر التطبيق	49.99	79.99	/images/prod-volcano-vaporizer.png	2	t	t	4.90	312	2026-04-12 16:56:43.876124+00	0
2	Aurora Bubbler	فقاعة الشفق	Color-changing borosilicate bubbler with ice catcher	فقاعة زجاجية متغيرة اللون مع ماسك ثلج	39.99	\N	/images/prod-aurora-bubbler.png	1	t	t	4.90	89	2026-04-12 16:56:43.876124+00	0
1	Crystal Helix Pipe	غليون الحلزون الكريستالي	Hand-blown borosilicate glass pipe with mesmerizing helix design	غليون زجاجي منفوخ يدوياً بتصميم حلزوني ساحر	9.99	14.99	/images/prod-crystal-helix.png	1	t	t	4.80	127	2026-04-12 16:56:43.876124+00	1
10	Santa Cruz Shredder 4pc	مطحنة سانتا كروز 4 قطع	Medical-grade anodized aluminum herb grinder	مطحنة أعشاب من الألمنيوم المؤكسد بجودة طبية	49.99	49.99	/images/prod-grinder.png	4	t	t	4.90	523	2026-04-12 16:56:43.876124+00	0
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 38, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 19, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

\unrestrict mm3G6Iv8WmMe8D7ShDcg8a9y08cbVRiQ2Zh1gD9oQfgmKq75mv596U8yeE1nQLZ

