import { Button, ConfigProvider, Modal } from "antd";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ token }) => ({
    'my-modal-body': {
        padding: token.paddingXL,
    },
    'my-modal-mask': {
        boxShadow: `inset 0 0 15px #fff`,
    },
    'my-modal-header': {
        borderBottom: `1px dotted ${token.colorPrimary}`,
        fontFamily: 'Cormorant',
        color: '#ffff',
        '& .ant-modal-title': {
            fontSize: '2rem',
            fontFamily: "'Cormorant', cursive",
        }
    },
    'my-modal-footer': {
        color: token.colorPrimary,
    },
    'my-modal-content': {
        border: '1px solid #333',
    },
}));

interface ModalDeleteProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
}

export default function ModalDelete({ open, onOk, onCancel }: ModalDeleteProps) {
    const { styles } = useStyle();

    const classNames = {
        body: styles['my-modal-body'],
        mask: styles['my-modal-mask'],
        header: styles['my-modal-header'],
        footer: styles['my-modal-footer'],
        content: styles['my-modal-content'],
    };

    const modalStyles = {
        header: {
            borderRadius: 0,
            paddingInlineStart: 5,
            color: '#fff',
        },
        body: {
            boxShadow: 'inset 0 0 5px #999',
            borderRadius: 5,
            padding: '1.5vh',
        },
        mask: {
            backdropFilter: 'blur(10px)',
        },
        footer: {
            borderTop: '1px solid #333',
        },
        content: {
            boxShadow: '0 0 30px #fff',
        },
    };

    return (
        <>
            <Modal
                title="Удаление персонажа"
                open={open}
                onOk={onOk}
                onCancel={onCancel}
                footer={null}
                classNames={classNames}
                styles={modalStyles}
                centered

            >
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', lineHeight: 1.5 }}>
                    <p style={{ fontSize: '1rem' }}>Вы уверены, что хотите удалить персонажа?</p>
                    <p style={{ fontSize: '1rem' }}>Это действие нельзя будет отменить.</p>
                </div>

                <div style={{ marginTop: 20, textAlign: 'right', display: 'flex', gap: 5, width: '100%', justifyContent: 'end' }}>
                    <Button type="primary" danger onClick={onOk}>
                        Удалить
                    </Button>
                    <Button onClick={onCancel} style={{ marginRight: 8 }}>
                        Отмена
                    </Button>
                </div>
            </Modal>

            <ConfigProvider
                modal={{
                    classNames,
                    styles: modalStyles,
                }}
            />
        </>
    );
}