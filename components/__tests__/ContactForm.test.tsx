import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import ContactForm from "../ContactForm";
import zhMessages from "@/messages/zh-TW.json";
import type { Service } from "@/lib/content";

const services: Service[] = [
  {
    id: "emergency",
    icon: "zap",
    name: "24小時緊急維修",
    description: "",
    details: "",
  },
];

function renderForm() {
  return render(
    <NextIntlClientProvider locale="zh-TW" messages={zhMessages}>
      <ContactForm services={services} />
    </NextIntlClientProvider>,
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: "送出需求" }));

    expect(screen.getByText("請填寫姓名")).toBeInTheDocument();
    expect(screen.getByText("請填寫聯絡電話")).toBeInTheDocument();
    expect(screen.getByText("請簡單描述您的狀況")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects an invalid phone number", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/姓名/), "王小明");
    await user.type(screen.getByLabelText(/聯絡電話/), "12345");
    await user.type(screen.getByLabelText(/狀況描述/), "浴室漏水");
    await user.click(screen.getByRole("button", { name: "送出需求" }));

    expect(
      screen.getByText("電話格式看起來不正確，請再確認"),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits valid data to /api/contact and shows success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/姓名/), "王小明");
    await user.type(screen.getByLabelText(/聯絡電話/), "0912-345-678");
    await user.selectOptions(
      screen.getByLabelText(/需要的服務/),
      "24小時緊急維修",
    );
    await user.type(screen.getByLabelText(/狀況描述/), "浴室天花板漏水");
    await user.click(screen.getByRole("button", { name: "送出需求" }));

    await waitFor(() =>
      expect(screen.getByText("已收到您的需求！")).toBeInTheDocument(),
    );

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
    const sentBody = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body,
    );
    expect(sentBody).toMatchObject({
      name: "王小明",
      phone: "0912-345-678",
      service: "24小時緊急維修",
      message: "浴室天花板漏水",
    });
  });

  it("shows a submit error when the API fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/姓名/), "王小明");
    await user.type(screen.getByLabelText(/聯絡電話/), "0912345678");
    await user.type(screen.getByLabelText(/狀況描述/), "跳電");
    await user.click(screen.getByRole("button", { name: "送出需求" }));

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
